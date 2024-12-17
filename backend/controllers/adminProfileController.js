import Admin from "../model/adminSchema.js";

async function changeCredential(request, response){
    try {
        const username = request.username;

        const admin = await Admin.findOne({username});

        const { data } = request.body;

        if (data.password !== admin.password){
            return response.status(403).json({message: "Invalid Password."});
        }

        await Admin.updateOne({_id: admin._id}, data.credentials);

        response.clearCookie("token");

        return response.status(200).json({message: "Credentials Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    changeCredential
}