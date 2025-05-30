import jwt from "jsonwebtoken";
// import { verifyToken } from "../utils/jwtUtils.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {


    console.log("middleware")
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
};