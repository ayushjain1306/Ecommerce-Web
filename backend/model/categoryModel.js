import mongoose from "mongoose";
import Admin from "./adminSchema.js";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Admin
    },
    no_of_products: {
        type: Number,
        default: 0
    },
    date_created: {
        type: Date,
        default: new Date(Date.now())
    }
})

const Categories = mongoose.model("categories", categorySchema);

export default Categories;