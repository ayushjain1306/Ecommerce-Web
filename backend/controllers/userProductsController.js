import Products from "../model/productSchema.js";
import Categories from "../model/categoryModel.js";

const productsLimit = 10;
const categoriesLimit = 5;

async function getProductsHome(request, response) {
    try {
        const products = await Products.find().sort({ "_id": -1 }).limit(productsLimit);

        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function getShoppingProducts(request, response) {
    try {
        const { skip, search } = request.headers;

        if (search !== "") {
            const products = await Products.find({category: search}).sort({ "_id": -1 }).skip(skip).limit(productsLimit);

            return response.status(200).json(products);
        }

        const products = await Products.find({}).sort({ "_id": -1 }).skip(skip).limit(productsLimit);

        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function getProductDetails(request, response) {
    try {
        const { productid } = request.headers;

        const product = await Products.findOne({ _id: productid });

        if (!product) {
            return response.status(404).json({ message: "Product Not Found." });
        }

        return response.status(200).json(product);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function getCategoryProducts(request, response) {
    try {
        const skip = request.headers.skip;

        const categories = await Categories.find({}).sort({ "_id": -1 }).skip(skip).limit(categoriesLimit);

        let newCategories = [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];

            const products = await Products.find({ category: category.name }).sort({ "_id": -1 }).limit(productsLimit);

            newCategories.push({ category, products });
        }

        return response.status(200).json(newCategories);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export {
    getProductsHome,
    getShoppingProducts,
    getProductDetails,
    getCategoryProducts
}