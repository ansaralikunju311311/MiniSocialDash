import express from "express";
import { userRegistration } from "../Controllers/userRegistration.js";
import { userLogin } from "../Controllers/userLogin.js";
const router = express.Router();
router.post('/signup', userRegistration);
router.post('/login', userLogin); // added semicolon for consistency
export default router;
