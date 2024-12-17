import Categories from "../model/categoryModel.js";
import Admin from "../model/adminSchema.js";
import Products from "../model/productSchema.js";

async function getCategories(request, response) {
    try {
        const username = request.username;
        const userData = await Admin.findOne({username});

        const categories = await Categories.find({admin_id: userData._id});

        return response.status(200).json(categories);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function addCategory(request, response){
    try {
        const username = request.username;

        const userData = await Admin.findOne({username});

        const category = request.body.category;

        await Categories.create({name: category, admin_id: userData._id});

        return response.status(200).json({message: "Category Saved Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function deleteCategory(request, response){
    try {
        const { categoryid } = request.headers;

        const category = await Categories.findOne({_id: categoryid});
    
        await Categories.deleteOne({_id: categoryid});

        await Products.deleteMany({category: category.name});
    
        return response.status(200).json({message: "Category Deleted Successfully."});
    }
    catch (error){
        return response.status(500).json({ mesage: error.message });
    }
}

async function editCategory(request, response){
    try {
        const { categoryId, newName } = request.body;

        const category = await Categories.findOne({_id: categoryId});

        await Categories.updateOne({_id: categoryId}, {name: newName});

        await Products.updateMany({category: category.name}, {category: newName});

        return response.status(200).json({message: "Category Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({ mesage: error.message });
    }
}

export {
    getCategories,
    addCategory,
    deleteCategory,
    editCategory
}