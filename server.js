import "dotenv/config";
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
import contactRoutes      from "./routes/contactRoutes.js";
import { startKeepAlive } from "./keepAlive.js";

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

connectDB();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/auth",       authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/orders",     orderRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/upload",     uploadRoutes);
app.use("/api/contact",    contactRoutes);

app.get("/", (req, res) => res.json({ message: "WatchHub API running ✅" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  startKeepAlive();
});