import mongoose from 'mongoose';
import Products from "./productSchema.js";
import Users from "./userSchema.js";
import Admin from "./adminSchema.js";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Products
    },
    admin_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Admin
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Users
    },
    user_name: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: new Date(Date.now())
    },
    image: {
        type: String,
        default: null
    }
})

const Reviews = mongoose.model('reviews', reviewSchema);

export default Reviews;