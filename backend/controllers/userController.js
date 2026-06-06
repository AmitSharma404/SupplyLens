import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const org = req.user.organization || 'Legacy Workspace';
        const users = await User.find({ organization: org }).select('-password');
        res.json(users);
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['admin', 'manager', 'warehouse_staff'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error("Error in updateUserRole:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
