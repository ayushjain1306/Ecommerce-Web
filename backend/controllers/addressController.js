import Address from "../model/addressSchema.js";
import Users from "../model/userSchema.js";

const addressLimit = 10;

async function getAddresses(request, response) {
    try {
        const email = request.email;

        const user = await Users.findOne({ email });

        const skip = request.headers.skip;

        const addresses = await Address.find({ user_id: user._id }).skip(skip).limit(addressLimit);

        return response.status(200).json(addresses);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addAddress(request, response) {
    try {
        const email = request.email;
        const { addressBody } = request.body;

        const user = await Users.findOne({ email });

        const addresses = await Address.find({ user_id: user._id });

        if (addresses.length === 0) {
            await Address.create({
                ...addressBody,
                user_id: user._id,
                default: true,
                pincode: parseInt(addressBody.pincode),
                phone: parseInt(addressBody.phone)
            })
        }
        else {
            if (addressBody.default) {
                await Address.updateMany({ user_id: user._id }, { default: false });
            }

            await Address.create({
                ...addressBody,
                user_id: user._id,
                pincode: parseInt(addressBody.pincode),
                phone: parseInt(addressBody.phone)
            })
        }

        return response.status(200).json({ message: "Address Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function editAddress(request, response) {
    try {
        const { addressBody, addressId } = request.body;

        await Address.updateOne({ _id: addressId }, addressBody);

        return response.status(200).json({ message: "Address Updated Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteAddress(request, response) {
    try {
        const { addressid } = request.headers;

        await Address.deleteOne({ _id: addressid });

        return response.status(200).json({ message: "Address Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function defaultEdit(request, response) {
    try {
        const { addressId, defaultId } = request.body;

        await Address.updateOne({ _id: defaultId }, { default: false });

        await Address.updateOne({ _id: addressId }, { default: true });

        return response.status(200).json({message: "Address Updated Successfully."});
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export {
    getAddresses,
    addAddress,
    editAddress,
    deleteAddress,
    defaultEdit
}