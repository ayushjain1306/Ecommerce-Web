import axios from "axios";
import { URL } from "../../utils/backendURL.js";

async function loginWork(adminDetails){
    try {
        await axios.post(`${URL}/admin-login`, { adminDetails }, { withCredentials: true });

        return true;
    }
    catch (error){
        if (error.response.data.message === "Username Not Found."){
            return "Username Not Found.";
        }
        else if (error.response.data.message === "Incorrect Password."){
            return "Incorrect Password.";
        }
        else {
            return false;
        }
    }
}

export async function adminData(){
    try {
        const response = await axios.get(`${URL}/admin-data`, { withCredentials: true });

        return response.data;
    }
    catch (error){
        return null;
    }
}

export async function adminLogout(){
    try {
        await axios.delete(`${URL}/admin-logout`, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

export default loginWork;