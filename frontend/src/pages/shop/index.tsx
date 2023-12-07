import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/authSlice";

export const ShopPage = () => {
    const { products }  = useGetProducts();
    const isAuthenticated = useSelector(selectIsAuthenticated);


    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
      }
    
    return (
        <div className="shop">
            <div className="products">
                {products?.map((product,index) => (
                    <Product product={product} key={index} />
                ))}
               
            </div>
        </div>
    )
};