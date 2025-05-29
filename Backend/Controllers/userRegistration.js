import User from '../Model/userSchmea.js'
import bcrypt from 'bcryptjs';
export const userRegistration = async (req, res) => {
    try {
        console.log('User registration attempt:', req.body);
        const { username, email, password, confirmPassword } = req.body;
        const errors = [];
        if (!username || !email || !password || !confirmPassword) {
            if (!username) errors.push('Username is required');
            if (!email) errors.push('Email is required');
            if (!password) errors.push('Password is required');
            if (!confirmPassword) errors.push('Please confirm your password');
            
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors 
            });
        }

        const existingUser = await User.findOne({ 
            $or: [
                { username },
                { email: email.toLowerCase() }
            ]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                errors.push('Username already exists');
            }
            if (existingUser.email === email.toLowerCase()) {
                errors.push('Email already in use');
            }
            return res.status(400).json({
                success: false,
                message: 'User already exists',
                errors
            });
        }

        if (username.length < 3) {
            errors.push('Username must be at least 3 characters long');
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        } else if (!passwordRegex.test(password)) {
            errors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword 
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};