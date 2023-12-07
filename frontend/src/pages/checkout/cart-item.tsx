import { IProduct } from "../../models/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, selectCartItems, updateCartItemCount } from "../../store/cartSlice";

interface Props {
    product: IProduct;
}

export const CartItem = (props: Props) => {
    const { _id, imageURL, productName, price } = props.product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const getCartItemCount = (itemId: string) : number => {
        if(cartItems){
            if (itemId in cartItems) {
                return cartItems[itemId]
            }
        }
        return 0;
    }
    const cartItemCount = getCartItemCount(_id);

    return (
        <div className="cart-item">
            {" "}
            <img src={imageURL} /> 
            <div className="description"> 
                <h3> {productName}</h3> 
                <p>Price: ${price}</p> 
            </div>
            <div className="count-handler">
                <button onClick={() => dispatch(removeFromCart(_id))}> - </button>
                <input
                    type="number" value={cartItemCount}
                    onChange={(e) => dispatch(updateCartItemCount({ newAmount: Number(e.target.value), itemId: _id }))}
                />
                <button onClick={() => dispatch(addToCart(_id))}> +</button>
            </div>
        </div>
    )
}