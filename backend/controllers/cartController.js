import Cart from "../model/cartSchema.js";
import Users from "../model/userSchema.js";
import Products from "../model/productSchema.js";

async function addItemCart(request, response){
    try {
        const email = request.email;

        const user = await Users.findOne({email});

        const cartBody = request.body.cartBody;

        await Cart.create({
            ...cartBody, user_id: user._id
        });

        return response.status(200).json({message: "Product Added in Cart Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function checkProductCart(request, response){
    try {
        const email = request.email;

        const user = await Users.findOne({email});

        const { productid } = request.headers;

        const cartProduct = await Cart.findOne({user_id: user._id, product_id: productid});

        if (!cartProduct){
            return response.status(200).json({
                message: "Product Not Added",
                status: false
            });
        }

        return response.status(200).json({
            message: "Product Already in Cart",
            status: true
        });
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getCartItems(request, response){
    try {
        const email = request.email;

        const user = await Users.findOne({email});

        const cartItems = await Cart.find({user_id: user._id});

        let newCartItems = [];

        for (let i = 0; i< cartItems.length; i++){
            const item = cartItems[i];

            const productId = item.product_id;

            const product = await Products.findOne({_id: productId});

            newCartItems.push({item, product});
        }

        return response.status(200).json(newCartItems);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function deleteItemInCart(request, response){
    try {
        const cartId = request.headers.cartid;

        await Cart.deleteOne({_id: cartId});

        return response.status(200).json({message: "Product Deleted from Cart Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    addItemCart,
    checkProductCart,
    getCartItems,
    deleteItemInCart
}