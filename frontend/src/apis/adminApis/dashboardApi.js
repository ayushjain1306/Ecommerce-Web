import axios from "axios";
import { URL } from "../../utils/backendURL.js";

async function getResult() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-result`, { withCredentials: true });

        if (data){
            return data;
        }

        throw "Failed to fetch data";
    }
    catch (error){
        return null;
    }
}

async function getYears(){
    try {
        const { data } = await axios.get(`${URL}/admin-get-years`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

async function getSalesData() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-sales-data`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

async function getTopSellingProducts() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-top-selling-products`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

export {
    getResult,
    getYears,
    getSalesData,
    getTopSellingProducts
}