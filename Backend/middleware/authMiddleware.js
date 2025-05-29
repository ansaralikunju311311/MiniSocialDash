import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    console.log("Auth middleware running");
    const token = req.cookies.token;
    
    if (!token) {
        console.log("No token found");
        return res.status(401).json({
            success: false,
            message: "No authentication token provided"
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};