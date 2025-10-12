import express from "express";

import {
  executeRequest,
  getHistoryItem,
  getHistory,
  deleteHistoryItem,
} from "../controllers/apiTestController.js";

import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/execute", executeRequest);
// Add GET handler for /execute to avoid errors when accessed via browser
router.get("/execute", (req, res) => {
  res.json({ message: "Use POST to test APIs with this endpoint." });
});
router.get("/history", authenticate, getHistory);
router.get("/history/:id", authenticate, getHistoryItem);
router.delete("/history/:id", authenticate, deleteHistoryItem);

export default router;
