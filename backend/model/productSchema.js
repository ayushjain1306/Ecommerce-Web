import mongoose from "mongoose";

const sizesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    }
})

const colorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    },
    sizes: [sizesSchema],
    colors: [colorsSchema],
    image: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: new Date(Date.now())
    }
})

const Products = mongoose.model("products", productSchema);

export default Products;