import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB        from "./config/db.js";
import authRoutes       from "./routes/authRoutes.js";
import categoryRoutes   from "./routes/categoryRoutes.js";
import productRoutes    from "./routes/productRoutes.js";
import orderRoutes      from "./routes/orderRoutes.js";
import adminRoutes      from "./routes/adminRoutes.js";
import uploadRoutes     from "./routes/uploadRoutes.js";

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// ✅ Allow ALL origins — fixes CORS forever
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth",       authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/orders",     orderRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/upload",     uploadRoutes);

app.get("/", (req, res) => res.json({ message: "WatchHub API running ✅" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));