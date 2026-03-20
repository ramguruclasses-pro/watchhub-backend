import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Login check — token valid hai ya nahi
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

// Admin check
export const admin = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  res.status(403).json({ message: "Admin access only" });
};