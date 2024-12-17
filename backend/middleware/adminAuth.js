import jwt from "jsonwebtoken";

function adminAuth(request, response, next){
    const token = request.cookies.token;

    if (token){
        try {
            const decodedResult = jwt.verify(token, process.env.ADMIN_SECRET_KEY);

            request.username = decodedResult.username;

            next();
        }
        catch (error){
            return response.status(403).json({message: "Invalid Token."});
        }
    }
    else {
        return response.status(404).json({message: "Token not found."})
    }
}

export default adminAuth;