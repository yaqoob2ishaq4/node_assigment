import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPurchasedItems } from "../../store/purchaseSlice";
import { addToCart, selectCartItems } from "../../store/cartSlice";

export const PurchasedItemsPage = () => {
  const purchasedItems = useSelector(selectPurchasedItems);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
    
    const getCartItemCount = (itemId: string) : number => {
        if(cartItems){
            if (itemId in cartItems) {
                return cartItems[itemId]
            }
        }
        return 0;
    }

  return (
    <div className="purchased-items-page">
      <h1> Previously Purchased Items Page </h1>

      <div className="purchased-items">
        {purchasedItems.map((item) => {
          const cartItemCount = getCartItemCount(item._id);
          return (
            <div key={item._id} className="item">
              <h3> {item.productName} </h3>
              <img src={item.imageURL} alt={item.productName} />
              <p> ${item.price} </p>
              <button onClick={() => dispatch(addToCart(item._id))}>
                Purchase Again {cartItemCount > 0 && <> ({cartItemCount})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};