import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function getProductReviews(product_id, skip) {
    try {
        const { data } = await axios.get(`${URL}/get-product-reviews`, {
            headers: {
                productId: product_id,
                skip
            },
            withCredentials: true
        });

        return data;
    }
    catch (error) {
        return null;
    }
}

async function addProductReview(review) {
    try {
        if (review.image) {
            const formData = new FormData();

            formData.append("file", review.image)

            const { data } = await axios.post(`${URL}/add-review-image`, formData, {withCredentials: true});

            review.image = data;
        }

        await axios.post(`${URL}/add-product-review`, { review }, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export {
    addProductReview,
    getProductReviews
}