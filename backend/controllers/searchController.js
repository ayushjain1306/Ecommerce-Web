import Categories from "../model/categoryModel.js";
import Products from "../model/productSchema.js";

async function getSearchData(request, response){
    try {
        const categories = await Categories.find({});

        return response.status(200).json(categories);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    getSearchData
}