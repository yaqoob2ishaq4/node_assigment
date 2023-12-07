import { useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authSlice";


export const useGetProducts = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const {headers} = useGetToken();
    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("http://localhost:3001/product", {headers});
            setProducts(fetchedProducts.data.products)
        } catch (err) {
            alert("ERROR: Something went wrong.");
        }
       
    };

    useEffect (() => {
        if(isAuthenticated){
            fetchProducts();
        }
    }, [isAuthenticated]);

    return { products };
}