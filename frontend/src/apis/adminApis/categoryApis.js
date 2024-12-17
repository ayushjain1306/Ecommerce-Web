import axios from 'axios';
import { URL } from '../../utils/backendURL.js';

async function getCategories() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-categories`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

async function addCategory(category) {
    try {
        await axios.post(`${URL}/add-admin-category`, { category }, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function deleteCategory(categoryid){
    try {
        await axios.delete(`${URL}/admin-delete-category`, { 
            headers: {
                categoryid: categoryid
            }, 
            withCredentials: true 
    });

        return true;
    }
    catch (error){
        return false;
    }
}

async function editCategory(categoryId, newName){
    try {
        await axios.put(`${URL}/admin-edit-category`, { categoryId, newName }, {withCredentials: true});

        return true;
    }
    catch (error){
        return false;
    }
}

export {
    getCategories,
    addCategory,
    deleteCategory,
    editCategory
}