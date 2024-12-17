import Admin from "../model/adminSchema.js";
import Orders from "../model/orderSchema.js";
import Users from "../model/userSchema.js";
import Products from "../model/productSchema.js";
import Cart from "../model/cartSchema.js";

async function fetchAdminOrders(request, response) {
    try {
        const username = request.username;

        const admin = await Admin.findOne({username});

        const orders = await Orders.find({admin_id: admin._id}).sort({"_id": -1});

        return response.status(200).json(orders);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function bookOrder(request, response){
    try {
        const email = request.email;

        const user = await Users.findOne({email: email});

        const {orderBody, cartStatus} = request.body;

        const product_id = orderBody.products[0].product_id;

        const product = await Products.findOne({_id: product_id});

        await Orders.create({...orderBody, user_id: user._id, admin_id: product.admin_id});

        await Products.updateOne({_id: product._id}, {quantity: product.quantity-1});

        if (cartStatus){
            await Cart.deleteMany({user_id: user._id});
        }

        return response.status(200).json({message: "Order Booked Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getUserOrders(request, response){
    try {
        const email = request.email;

        const user = await Users.findOne({email});

        const orders = await Orders.find({user_id: user._id}).sort({"_id": -1});

        return response.status(200).json(orders);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function updateStatus(request, response){
    try {
        const { orderId } = request.body;

        const order = await Orders.findOne({_id: orderId});

        await Orders.updateOne({_id: orderId}, {status: order.status === "Pending" ? "Shipped" : "Delivered"});

        return response.status(200).json({message: "Order Status Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    fetchAdminOrders,
    bookOrder,
    getUserOrders,
    updateStatus
}