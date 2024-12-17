import axios from 'axios';
import { URL } from '../../utils/backendURL.js';

async function changeCredential(data){
    try {
        await axios.post(`${URL}/admin-change-credentials`, { data }, { withCredentials: true });

        return true;
    }
    catch (error){
        if (error?.response?.data?.message === "Invalid Password."){
            return "Invalid Password.";
        }

        return false;
    }
}

export {
    changeCredential
}