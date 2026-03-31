import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/userModels.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({
        success:true,
        message: "Login successful",
        user: { name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ 
        success:false,
        message: "Internal Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    // If you are using cookies for JWT, you would clear the cookie here:
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
