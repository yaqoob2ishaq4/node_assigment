import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { selectAvailableMoney } from "../store/moneySlice";
import { setIsAuthenticated,selectIsAuthenticated } from "../store/authSlice";
// import { useCookies } from "react-cookie";


export const Navbar = () => {
    const availableMoney = useSelector(selectAvailableMoney);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setIsAuthenticated(false));
      };

    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1> Shop Tech</h1>
            </div>
            <div className="navbar-links d-flex justify-content-between align-items-center flex-wrap flex-gap-8 ">
                {isAuthenticated && (
                    <>
                        <Link to="/">Shop</Link>
                        <Link to="/purchased-items">Purchases</Link>
                        <Link to="/checkout">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        </Link>
                        <Link to="/auth" onClick={logout}>
                        Logout
                        </Link>
                        <span> ${availableMoney.toFixed(2)} </span>
                    </>
                )}
            </div>
        </div>
    );
};