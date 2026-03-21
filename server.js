import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB          from "./config/db.js";
import authRoutes         from "./routes/authRoutes.js";
import categoryRoutes     from "./routes/categoryRoutes.js";
import productRoutes      from "./routes/productRoutes.js";
import orderRoutes        from "./routes/orderRoutes.js";
import adminRoutes        from "./routes/adminRoutes.js";
import uploadRoutes       from "./routes/uploadRoutes.js";
import { startKeepAlive } from "./keepAlive.js";

// ✅ FIX 1: Declare PORT at the top, before anything uses it
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

connectDB();

const app = express();

// ✅ FIX 2: CORS — wildcard origin with credentials is blocked by browsers.
// Option A (recommended): whitelist your frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Option B: if you truly need all origins, drop credentials:
// app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.use("/api/auth",       authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/orders",     orderRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/upload",     uploadRoutes);

app.get("/", (req, res) => res.json({ message: "WatchHub API running ✅" }));

// ✅ FIX 3: Single app.listen() call, at the end, after all middleware & routes
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  startKeepAlive();
});