import express from "express";
import { getDashboardSummary, getAllUsers, deleteUser } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary",       protect, admin, getDashboardSummary); // Dashboard data
router.get("/users",         protect, admin, getAllUsers);          // Sabhi users
router.delete("/users/:id",  protect, admin, deleteUser);          // User delete

export default router;