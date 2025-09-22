import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import serviceRoutes from "./routes/service.js";
import invoiceRoutes from "./routes/invoice.js";
import authRoutes from "./routes/auth.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/invoices", invoiceRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
