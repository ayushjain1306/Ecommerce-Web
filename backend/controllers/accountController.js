import Users from "../model/userSchema.js";
import jwt from "jsonwebtoken";

function generateToken(email){
    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: "1h"});

    return token;
}

async function loginWork(request, response){
    try {
        const { userDetails } = request.body;

        const user = await Users.findOne({email: userDetails.email});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        if (user.password !== userDetails.password){
            return response.status(404).json({message: "Incorrect Password."});
        }

        const token = generateToken(userDetails.email);

        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        return response.status(200).json({
            message: "User Logged In Successfully.",
            user
        });
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function signupWork(request, response){
    try {
        const { userDetails } = request.body;

        const emailCheck = await Users.findOne({email: userDetails.email});

        if (emailCheck){
            return response.status(400).json({message: "Account on this email already exists."});
        }

        const phoneCheck = await Users.findOne({phone: userDetails.phone});

        if (phoneCheck){
            return response.status(400).json({message: "Account on this phone number already exists."});
        }

        await Users.create(userDetails);

        const token = generateToken(userDetails.email);

        const user = await Users.findOne({email: userDetails.email});

        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })

        return response.status(200).json({
            message: "User has successfully Signedup",
            user
        })
    }
    catch (error){
        response.status(500).json({message: error.message}); 
    }
}

async function fetchUserData(request, response){
    try {
        const email = request.email;

        const user = await Users.findOne({email});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        return response.status(200).json(user);
    }
    catch (error){
        response.status(500).json({message: error.message});
    }
}

async function forgotPassword(request, response){
    try {

    }
    catch (error){
        
    }
}

async function resetPassword(request, response){
    try {
        const email = request.email;

        const { newPassword } = request.body;

        const user = await Users.findOne({email});

        await Users.updateOne({_id: user._id}, {password: newPassword});

        return response.status(200).json({message: "Password Updated Successfully."});
    }
    catch (error){

    }
}

async function logoutWork(request, response){
    try {
        const token = request.cookies.token;

        if (!token){
            return response.status(200).json({message: "Token Not Found."});
        }

        response.clearCookie("token");

        return response.status(200).json({message: "User Logged Out Successfully."});
    }
    catch (error){
        return response.status(500).json({message: "error.message"})
    }
}

async function checkPassword(request, response){
    try {
        const { password } = request.headers;

        const email = request.email;

        const user = await Users.findOne({email});

        if (user.password == password){
            return response.status(200).json({
                message: "Correct Password",
                status: true
            })
        }

        return response.status(403).json({
            message: "Incorrect Password",
            status: false
        })
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export { 
    loginWork, 
    signupWork, 
    forgotPassword, 
    fetchUserData, 
    logoutWork,
    resetPassword,
    checkPassword
};