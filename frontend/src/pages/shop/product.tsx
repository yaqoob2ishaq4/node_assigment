import { IProduct } from "../../models/interfaces";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../store/cartSlice";

interface Props {
    product: IProduct;
}
export const Product = (props: Props) => {
    const {_id, productName, description, price, stockQuantity, imageURL} = props.product;
    const cartItems = useSelector(selectCartItems);

    const getCartItemCount = (itemId: string) : number => {
        if(cartItems){
            if (itemId in cartItems) {
                return cartItems[itemId]
            }
        }
        return 0;
    }
    const count = getCartItemCount(_id);

    const dispatch = useDispatch();

    return (
        <div className="product">
            <div style={{width: '250px'}}>
            <img src={imageURL} />{" "}
            </div>
            <div className="description">
                <h3>{productName}</h3>
                <p>{description}</p>
                <p>${price}</p>
            </div>
            <button className="add-to-cart-bttn" onClick={() => dispatch(addToCart(_id))}> Add To Cart {count > 0 && <> ({count})</>}</button>
            <div className="stock-quantity">
                {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
            </div>
        </div>
        );
};