import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, selectCartItems } from "../../store/cartSlice";
import { ProductErrors } from "../../models/errors";
import { useGetToken } from "../../hooks/useGetToken";
import axios from "axios";

export const CheckoutPage = () => {
    const { products } = useGetProducts();
    const dispatch = useDispatch()
    const { headers } = useGetToken();

    const cartItems = useSelector(selectCartItems);
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo: IProduct = products.find(
                    (product) => product._id === item
                );
                totalAmount += cartItems [item] * itemInfo?.price;
            }
        }
        return totalAmount;
    }
    const getCartItemCount = (itemId: string) : number => {
      if(cartItems){
          if (itemId in cartItems) {
              return cartItems[itemId]
          }
      }
      return 0;
  }
  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      const res = await axios.post(
        "http://localhost:3001/product/checkout",
        body,
        { headers }
      );
      dispatch(resetCart())
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case ProductErrors.NO_PRODUCT_FOUND:
          errorMessage = "No product found";
          break;
        case ProductErrors.NO_AVAILABLE_MONEY:
          errorMessage = "Not enough money";
          break;
        case ProductErrors.NOT_ENOUGH_STOCK:
          errorMessage = "Not enough stock";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert("ERROR: " + errorMessage);
    }
  };
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    return (
        <div className="cart">
            <div>
                <h1> Your Cart Items</h1> 
            </div>
            <div className="cart">
                {products.map((product: IProduct) => {
                    
                    if(getCartItemCount(product._id) !== 0) { 
                        return <CartItem product={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
        </div>
    )
};