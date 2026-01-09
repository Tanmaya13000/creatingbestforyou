import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import contactRoutes from "./Rotues/Contact.route.js";

// USE ROUTES
// CONTACT ROUTES

// ENV CHECK
if (!process.env.MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is not defined in .env file");
}

const app = express();

// ALLOWED ORIGINS (FIXED)
const allowedOrigins = [
    "https://creatingbestforyou.online",
    "http://localhost:3000",
];


// MONGODB CONNECTION
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
});

// MIDDLEWARE
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));



app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));



app.use("/user",contactRoutes);



// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("🚀 API is running!");
});


// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port http://localhost:${PORT}`);
});
