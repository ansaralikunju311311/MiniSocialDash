import express from "express";
import { userRegistration } from "../Controllers/userRegistration.js";
import { userLogin } from "../Controllers/userLogin.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { ProfileInput } from "../Controllers/profileInput.js";
import { getUserProfile } from "../Controllers/userController.js";

const router = express.Router();

// Public routes
router.post('/signup', userRegistration);
router.post('/login', userLogin); 

// Protected routes
router.use(authMiddleware);

// User profile routes
router.get('/user', getUserProfile);
router.post('/profile', ProfileInput);
router.get('/verify-token', (req, res) => {
    res.json({ success: true, message: 'Token is valid' });
});


export default router;
