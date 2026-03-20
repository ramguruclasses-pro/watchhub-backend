import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("MULTER/CLOUDINARY ERROR:", err);
      return res.status(500).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("FILE UPLOADED:", req.file);
    res.json({ imageUrl: req.file.path });
  });
});

export default router;