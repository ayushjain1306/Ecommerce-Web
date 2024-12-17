import axios from "axios";
import { URL } from "../../utils/backendURL.js";

async function getProducts() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-products`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

async function addProduct(productDetails) {
    try {
        let imageLinks = [];

        for (let i = 0; i < productDetails.image.length; i++) {
            const formData = new FormData();

            formData.append('file', productDetails.image[i]);
    
            const response = await axios.post(`${URL}/add-product-image`, formData , {withCredentials: true}); 

            imageLinks.push(response.data);   
        }
        
        await axios.post(`${URL}/admin-add-products`, {productDetails: {...productDetails, image: imageLinks}}, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function deleteProduct(productId){
    const headers = {
        "productId": productId
    }

    try {
        await axios.delete(`${URL}/admin-delete-product`, { 
            headers,
            withCredentials: true 
        });

        return true;
    }
    catch (error){
        return false;
    }
}

async function editProduct(productId, newProduct){
    try {
        await axios.put(`${URL}/admin-edit-product`, { productId, newProduct }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function getProductName(productId){
    try {
        const { data } = await axios.get(`${URL}/get-product-name`, {
            headers: {
                productid: productId
            },
            withCredentials: true
        })

        return data.productName;
    }
    catch (error){
        return "";
    }
}

export {
    getProducts,
    addProduct,
    deleteProduct,
    editProduct,
    getProductName,
}