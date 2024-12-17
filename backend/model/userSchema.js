import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: String,
    pincode: Number,
    city: String,
    state: String,
    image: String
})

const Users = mongoose.model("users", userSchema);

export default Users;