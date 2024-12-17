import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function addToCart(cartBody){
    try {
        await axios.post(`${URL}/add-item-cart`, { cartBody }, { withCredentials: true })

        return true;
    }
    catch (error){
        return false;
    }
}

async function checkProductInCart(productId){
    try {
        const { data } = await axios.get(`${URL}/check-product-cart`, {
            headers: {
                productid: productId
            },
            withCredentials: true
        })

        return data.status;
    }
    catch (error){
        return false;
    }
}

async function getCartItems(){
    try {
        const { data } = await axios.get(`${URL}/get-cart-items`, {withCredentials: true})

        return data;
    }
    catch (error){
        return null;
    }
}

async function deleteItemInCart(cartId){
    try {
        await axios.delete(`${URL}/delete-item-cart`, {
            headers: {
                cartid: cartId
            },
            withCredentials: true
        });

        return true;
    }
    catch (error){
        return false;
    }
}

export {
    addToCart,
    checkProductInCart,
    getCartItems,
    deleteItemInCart
}