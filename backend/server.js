
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiTestRoutes from "./routes/apiTestRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { corsOptions } from "./config/cors.js";
import seedDemoUser from "./utils/seedDemoUser.js";
dotenv.config();

// Check required environment variables
const requiredEnvs = ["MONGO_URI"];
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    console.error(`Missing required environment variable: ${env}`);
    process.exit(1);
  }
}

const app = express();
// Ensure 'process' is defined (Node.js environment)
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Seed demo user
seedDemoUser();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", apiTestRoutes);
app.use("/api/data", dataRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
