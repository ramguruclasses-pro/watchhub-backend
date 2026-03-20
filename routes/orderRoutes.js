import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",            protect,        createOrder);       // User — order banao
router.get("/myorders",     protect,        getMyOrders);       // User — apne orders
router.get("/:id",          protect,        getOrderById);      // User — ek order
router.get("/",             protect, admin, getAllOrders);       // Admin — sabhi orders
router.put("/:id/status",   protect, admin, updateOrderStatus); // Admin — status update

export default router;