import { Router, Request, Response } from "express";
import { IProduct, ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { UserErrors, ProductErrors } from "../errors";
import { verifyToken, isAdmin } from "./user";

const router = Router();

router.get("/", verifyToken, async (_, res: Response) => {
// router.get("/", async (_, res: Response) => {
    try {
        const products = await ProductModel.find({}) ;
        res.json({ products }) ;
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.post("/checkout",verifyToken, async (req: Request, res: Response) => {
    const { customerID, cartItems } = req. body;
  
    try {
        const user = await UserModel.findById(customerID);
        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({ _id: { $in: productIDs } }) ;
        
        if (!user) {
            return res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }
        if (products.length !== productIDs.length) {
            return res.status(400).json({type: ProductErrors.NO_PRODUCT_FOUND});
        }

        let totalPrice = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);
            
            if (!product) {
                return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
            }
            if (product.stockQuantity < cartItems [item]) {
                return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND})
            }
            totalPrice += product.price * cartItems[item];
        }

        if (user.availableMoney < totalPrice) {
            return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY })
        }

        user.availableMoney -= totalPrice 
        user.purchasedItems.push(...productIDs)
        await user.save()
        await ProductModel.updateMany(
            { _id: { $in: productIDs } }, 
            { $inc: { stockQuantity: -1 } }
        );
        res.json({ purchasedItems: user.purchasedItems });
    } catch (err) {
        res.status (400).json(err);
    }
});

router.get(
    "/purchased-items/:customerID",
    verifyToken,
    async (req: Request, res: Response) => {
      const { customerID } = req.params;
      try {
        const user = await UserModel.findById(customerID);
  
        if (!user) {
          return res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
        }
  
        const products = await ProductModel.find({
          _id: { $in: user.purchasedItems },
        });
  
        res.json({ purchasedItems: products });
      } catch (error) {
        res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
      }
    }
  );

  router.post('/add-product', isAdmin, async (req: Request, res: Response) => {
    const { productName, price, description, imageURL, stockQuantity } = req.body;

    try {
        // Validate request data
        if (!productName || !price || !description || !imageURL || !stockQuantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new product
        const newProduct: IProduct = {
            productName,
            price,
            description,
            imageURL,
            stockQuantity,
        };

        // Save the new product to the database
        const product = await ProductModel.create(newProduct);

        res.json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
export { router as productRouter };