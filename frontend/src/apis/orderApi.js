import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function bookOrder(order, cartStatus) {
    try {
        await axios.post(`${URL}/book-order`, { orderBody: order, cartStatus }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function getOrders() {
    try {
        const { data } = await axios.get(`${URL}/get-user-orders`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

export {
    bookOrder,
    getOrders
};