import Admin from "../model/adminSchema.js";
import jwt from "jsonwebtoken";

function generateToken(username) {
    const token = jwt.sign({ username }, process.env.ADMIN_SECRET_KEY, { expiresIn: "1h" });

    return token;
}

async function adminLogin(request, response) {
    try {
        const adminDetails = request.body.adminDetails;

        const usernameCheck = await Admin.findOne({ username: adminDetails.username });

        if (!usernameCheck) {
            return response.status(404).json({ message: "Username Not Found." });
        }

        if (usernameCheck.password !== adminDetails.password) {
            return response.status(404).json({ message: "Incorrect Password." });
        }

        const token = generateToken(adminDetails.username);

        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        response.status(200).json({ message: "Admin Logged In Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function adminData(request, response) {
    try {
        const username = request.username;

        const adminData = await Admin.findOne({ username });

        response.status(200).json(adminData);
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function adminLogout(request, response) {
    try {
        const token = request.cookies.token;

        if (!token){
            return response.status(200).json({ message: "Token Not Found." });
        }

        response.clearCookie("token");

        return response.status(200).json({message: "Admin Logged Out Successfully."});
    }
    catch (error) {
        return response.status(500).json({ message: error.message }) 
    }
}

export default adminLogin;