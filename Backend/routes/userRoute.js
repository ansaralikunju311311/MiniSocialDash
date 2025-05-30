import express from "express";
import { userRegistration } from "../Controllers/userRegistration.js";
import { userLogin } from "../Controllers/userLogin.js";
import { authMiddleware } from '../middleware/authMiddleware.js'
import { ProfileInput } from "../Controllers/profileInput.js";
const router = express.Router();
router.post('/signup', userRegistration);
router.post('/login', userLogin); 
router.post('/profile',
    authMiddleware,
    ProfileInput);
router.get('/verify-token', authMiddleware, (req, res) => {
    res.json({ success: true, message: 'Token is valid' });
});
export default router;
