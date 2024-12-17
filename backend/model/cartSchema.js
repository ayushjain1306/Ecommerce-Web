import mongoose from "mongoose";
import Users from "./userSchema.js";
import Products from "./productSchema.js";

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Users
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Products
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
        default: 1
    }
})

const Cart = new mongoose.model("carts", cartSchema);

export default Cart;