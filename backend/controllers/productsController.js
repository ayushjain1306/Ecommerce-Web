import Products from "../model/productSchema.js";
import Admin from "../model/adminSchema.js";
import bucket from "../firebase/firebaseConfig.js";
import Categories from "../model/categoryModel.js";
import Reviews from "../model/reviewSchema.js";

async function getAdminProducts(request, response) {
    try {
        const username = request.username;

        const admin = await Admin.findOne({ username });

        const products = await Products.find({ admin_id: admin._id });

        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addProduct(request, response) {
    try {
        const username = request.username;

        const admin = await Admin.findOne({ username });

        const productDetails = request.body.productDetails;

        const category = await Categories.findOne({ name: productDetails.category });

        const newProduct = {
            name: productDetails.name,
            description: productDetails.description,
            image: productDetails.image,
            price: parseInt(productDetails.price),
            mrp: parseInt(productDetails.mrp),
            colors: productDetails.colors,
            sizes: productDetails.sizes,
            admin_id: admin._id,
            quantity: parseInt(productDetails.quantity),
            status: parseInt(productDetails.quantity) > 0 ? "Available" : "Unavailable",
            category: productDetails.category
        }

        await Products.create(newProduct);
        
        await Categories.updateOne({ "_id": category._id }, { no_of_products: category.no_of_products + 1 });

        return response.status(200).json({ message: "Product Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addProductImage(request, response) {
    try {
        const image = request.file;

        if (!image) {
            return response.status(404).json({ message: "File not Found." });
        }

        const filename = Date.now() + "-" + request.file.originalname;

        const blob = bucket.file(filename);

        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: request.file.mimetype
            }
        })

        blobStream.on('error', (error) => {
            return response.status(500).json({ message: error.message });
        })

        blobStream.on('finish', async () => {
            await blob.makePublic();

            const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            return response.status(200).json(url);
        })

        blobStream.end(request.file.buffer);
    }
    catch (error) {
        return response.status(500).json({ mesage: error.message });
    }
}

async function deleteProduct(request, response){
    try {
        const { productid } = request.headers;

        const product = await Products.findOne({_id: productid});

        const category = await Categories.findOne({name: product.category});
    
        await Products.deleteOne({_id: productid});

        await Reviews.deleteMany({product_id: productid})

        await Categories.updateOne({_id: category._id}, {no_of_products: category.no_of_products-1});
    
        return response.status(200).json({message: "Product Deleted Successfully."});
    }
    catch (error){
        return response.status(500).json({ mesage: error.message });
    }
}

async function editProduct(request, response){
    try {
        const { productId, newProduct } = request.body;

        await Products.updateOne({_id: productId}, newProduct);

        return response.status(200).json({message: "Product Updated Successfully."});
    }
    catch(error){
        return response.status(500).json({message: error.message});
    }
}

async function getProductName(request, response){
    try {
        const { productid } = request.headers;

        const product = await Products.findOne({_id: productid});

        return response.status(200).json({productName: product.name});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    getAdminProducts,
    addProduct,
    addProductImage,
    deleteProduct,
    editProduct,
    getProductName
}