import axios from "axios";
import { URL } from "../../utils/backendURL.js";

async function getAllReviews() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-reviews`, { withCredentials: true })

        return data;
    }
    catch (error){
        return null;
    }
}

async function deleteReview(reviewId){
    try {
        await axios.delete(`${URL}/admin-delete-review`, {
            headers: {
                reviewid: reviewId
            },
            withCredentials: true
        })

        return true;
    }
    catch (error){
        return false;
    }
}

export {
    getAllReviews,
    deleteReview
}