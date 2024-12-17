import mongoose from "mongoose";
import Products from "./productSchema.js";
import Users from "./userSchema.js";
import Admin from "./adminSchema.js";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
})

const productSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: Products
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        requires: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Users
    },
    no_of_items: {
        type: Number,
        default: 1
    },
    products: [productSchema],
    status: {
        type: String,
        default: "Pending"
    },
    transaction_id: {
        type: String,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Admin
    },
    amount: {
        type: Number,
        required: true
    },
    address: addressSchema,
    date_created: {
        type: Date,
        default: new Date(Date.now())
    }
})

const Orders = mongoose.model("orders", orderSchema);

export default Orders;