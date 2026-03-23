import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/userModels';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}