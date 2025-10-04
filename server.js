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

// ✅ Proper CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://snowwhite-admin.onrender.com",
  "https://snowwhitelaundry.store",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());

// ✅ Routes
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/invoices", invoiceRoutes);

// ✅ Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ Catch-all for 404s
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
