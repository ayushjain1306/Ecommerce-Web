import mongoose from "mongoose";
import Users from "./userSchema.js";

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Users
    },
    name: {
        type: String, 
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
    phone: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    default : {
        type: Boolean,
        required: true
    }
})

const Address = mongoose.model("adresses", addressSchema);

export default Address;