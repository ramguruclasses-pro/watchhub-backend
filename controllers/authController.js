import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("REGISTER BODY:", req.body); // debug

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      isAdmin: user.isAdmin,
      token:   generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body); // debug

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    console.log("USER FOUND:", user ? "yes" : "no"); // debug

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    console.log("PASSWORD MATCH:", isMatch); // debug

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      isAdmin: user.isAdmin,
      token:   generateToken(user._id),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};