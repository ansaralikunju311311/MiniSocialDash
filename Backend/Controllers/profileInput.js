import User from "../Model/userSchmea.js";

export const ProfileInput = async (req, res) => {
    try {
        console.log("coming here")
        console.log('Profile input attempt:', req.body);
        const { profileId, email } = req.body;
        const errors = [];
        
        if (!profileId) {
            errors.push('Profile ID is required');
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors 
            });
        }

        if (!email) {
            errors.push('Email is required');
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

      const user = await User.findOne({ email });
        
        if (!user) {
            errors.push('User not found');
            return res.status(404).json({
                success: false,
                message: 'User not found',
                errors
            });
        }

        user.profileId = profileId;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile ID updated successfully',
            data: {
                profileId: user.profileId,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Profile input error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};