import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { AuthPage } from "./pages/auth" 
import { ShopPage } from "./pages/shop" 
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/authSlice";
import axios from "axios";
import { useGetToken } from "./hooks/useGetToken";
import { setAvailableMoney } from "./store/moneySlice";
import { setPurchasedItems } from "./store/purchaseSlice";


function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log('isAuthenticated : ',isAuthenticated)
  const { headers } = useGetToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      // setCookies("access_token", null);
    }
  }, [isAuthenticated]);

  const fetchAvailableMoney = async () => {
    const res = await axios.get(
      `http://localhost:3001/user/available-money/${localStorage.getItem("userID")}`,
      { headers }
    );
    dispatch(setAvailableMoney(res.data.availableMoney));
  };
  const fetchPurchasedItems = async () => {
    const res = await axios.get(
      `http://localhost:3001/product/purchased-items/${localStorage.getItem(
        "userID"
      )}`,
      { headers }
    );

    dispatch(setPurchasedItems(res.data.purchasedItems));
  };

  return (
    <div className="App">
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />}/>
            <Route path="/auth" element={<AuthPage /> }/>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />}/>
          </Routes>
      </Router>
    </div>
  )
}
export default App;
