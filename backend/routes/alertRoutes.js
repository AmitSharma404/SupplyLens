import express from "express";
import { getAlerts, markAlertRead } from "../controllers/alertController.js";
import { protect } from "../middleware/authMiddleware.js";

const alertRouter = express.Router();

alertRouter.get("/", protect, getAlerts);
alertRouter.put("/:id/read", protect, markAlertRead);

export default alertRouter;
