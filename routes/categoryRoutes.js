import express from "express";
import { getCategories, createCategory, deleteCategory } from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",     getCategories);                       // Public
router.post("/",    protect, admin, createCategory);      // Admin only
router.delete("/:id", protect, admin, deleteCategory);    // Admin only

export default router;