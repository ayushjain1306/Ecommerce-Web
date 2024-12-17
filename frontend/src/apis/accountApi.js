import axios from "axios";
import { URL } from "../utils/backendURL.js";

async function loginApi(userDetails, setUser) {
    try {
        const response = await axios.post(`${URL}/login`, { userDetails }, { withCredentials: true });

        setUser(response.data.user);

        return true;
    }
    catch (error) {
        if (error?.response?.data?.message === "User Not Found." || error.response.data.message === "Incorrect Password."){
            return "Invalid Credentials."
        }
        return false;
        
    }
}

async function signupApi(userDetails, setUser){
    try {
        const response = await axios.post(`${URL}/signup`, { userDetails }, { withCredentials: true });

        setUser(response.data.user)

        return true;
    }
    catch (error){
        if (error?.response?.data?.message === "Account on this email already exists."){
            return "Account on this email already exists.";
        }
        else if (error?.response?.data?.message === "Account on this phone number already exists."){
            return "Account on this phone number already exists.";
        }
        return false;
    }
}

async function fetchUser(){
    try {
        const response = await axios.get(`${URL}/get-user-data`, { withCredentials: true });

        return response.data;
    }
    catch (error){
        return null;
    }
}

async function logoutWork() {
    try {
        await axios.delete(`${URL}/user-log-out`, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function checkPassword(password) {
    try {
        await axios.get(`${URL}/check-password`, {
            headers: {
                password
            },
            withCredentials: true
        })

        return true;
    }
    catch (error){
        return false;
    }
}

async function resetPassword(password) {
    try {
        await axios.put(`${URL}/reset-password`, { newPassword: password }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

export {
    loginApi,
    signupApi,
    fetchUser,
    logoutWork,
    checkPassword,
    resetPassword
}