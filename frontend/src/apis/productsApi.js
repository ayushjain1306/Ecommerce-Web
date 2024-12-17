import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function getProducts(){
    try {
        const { data } = await axios.get(`${URL}/get-latest-products-home`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

async function getShoppingProducts(skip, search) {
    try {
        const { data } = await axios.get(`${URL}/get-shopping-products`, { 
            headers: {
                skip, search
            }, 
            withCredentials: true 
        });

        return data;
    }
    catch (error){
        return null;
    }
}

async function getProductDetails(productId){
    try {
        const { data } = await axios.get(`${URL}/get-product-details`, {
            headers: {
                productId
            },
            withCredentials: true
        })

        return data;
    }
    catch (error) {
        return null;
    }
}

async function getCategoryProducts(skip) {
    try {
        const { data } = await axios.get(`${URL}/get-category-products`, {
            headers: {
                skip
            }
        });

        return data;
    }
    catch (error){
        return null;
    }
}

export {
    getProducts,
    getShoppingProducts,
    getProductDetails,
    getCategoryProducts
}