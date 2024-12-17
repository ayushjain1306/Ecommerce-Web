import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function getCatgeories() {
    try {
        const { data } = await axios.get(`${URL}/get-search-data`);
        
        return data;
    }
    catch (error){
        return null;
    }
}

export {
    getCatgeories
}