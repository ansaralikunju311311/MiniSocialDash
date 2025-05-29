import User from "../Model/userSchmea.js";
import bcrypt from "bcryptjs";
export const userLogin = async (req, res) => {
    try {
        console.log('User login attempt:', req.body);
        const { email, password } = req.body;
        const errors = [];
        if (!email || !password) {
            if (!email) errors.push('Email is required');
            if (!password) errors.push('Password is required');
            
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors 
            });
        }

        const user = await User.findOne({ 
                email: email.toLowerCase() 
        });

        if (!user) {
            errors.push('User not found');
            return res.status(404).json({
                success: false,
                message: 'User not found',
                errors
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.push('Invalid credentials');
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
                errors
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        console.error('User login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
