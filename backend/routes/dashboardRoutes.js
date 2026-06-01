import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", protectedRoute, getDashboardStats);

export default dashboardRouter;
