import axios from "axios";
import { URL } from "../../utils/backendURL.js";

async function getOrders(){
    try {
        const { data } = await axios.get(`${URL}/fetch-admin-orders`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

async function updateStatus(id){
    try {
        await axios.put(`${URL}/admin-update-status`, { orderId: id }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

export {
    getOrders,
    updateStatus
}