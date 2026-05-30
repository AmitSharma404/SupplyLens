import express from "express";
import { getAlerts, markAlertRead } from "../controllers/alertController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const alertRouter = express.Router();

alertRouter.get("/", protectedRoute, getAlerts);
alertRouter.put("/:id/read", protectedRoute, markAlertRead);

export default alertRouter;
