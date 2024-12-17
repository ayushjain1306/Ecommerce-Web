import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function getAddresses(skip) {
    try {
        const { data } = await axios.get(`${URL}/get-addresses`, {
            headers: {
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

async function addAddress(address) {
    try {
        await axios.post(`${URL}/add-address`, { addressBody: address }, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function editAddress(address, addressId){
    try {
        await axios.put(`${URL}/edit-address`, { addressBody: address, addressId }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function deleteAddress(addressId) {
    try {
        await axios.delete(`${URL}/delete-address`, {
            headers: {
                addressid: addressId
            },
            withCredentials: true
        })

        return true;
    }
    catch (error){
        return false;
    }
}

async function defaultEdit(addressId, defaultId) {
    try {
        await axios.put(`${URL}/set-default-address`, { addressId, defaultId }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

export {
    getAddresses,
    addAddress,
    editAddress,
    deleteAddress,
    defaultEdit
};