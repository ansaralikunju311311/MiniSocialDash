import express from "express";
import { userRegistration } from "../Controllers/userRegistration.js";
import { userLogin } from "../Controllers/userLogin.js";
const router = express.Router();
// router.get("/test", (req, res) => {
//     console.log('Test endpoint hit');
//     res.send("Server is working!");
// });
// router.post("/login", (req, res) => {
//     console.log('Login attempt:', req.body);
//     res.json({ message: "Login successful", user: req.body });
// });
// router.post("/signup", (req, res) => {
//     console.log('Signup attempt:', req.body);
//     res.status(201).json({ message: "User created", user: req.body });
// });
router.post('/signup',userRegistration);
router.post('/login',userLogin)
export default router;
