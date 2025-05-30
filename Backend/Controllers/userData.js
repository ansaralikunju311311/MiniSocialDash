import User from "../Model/userSchmea.js";

export const getUserProfile = async (req, res) => {
    try {
        // The user is already attached to the request by the authMiddleware
        const user = await User.findById(req.user.userId).select('-password');
        


        console.log("debug",user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                profileId: user.profileId,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user profile'
        });
    }
};
