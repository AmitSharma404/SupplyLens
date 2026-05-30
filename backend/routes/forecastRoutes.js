import express from "express";
import { getProductForecast } from "../controllers/forecastController.js";
import { protectedRoute, verifyRole } from "../middleware/authMiddleware.js";

const forecastRouter = express.Router();

forecastRouter.get("/:productId", protectedRoute, verifyRole(["manager", "admin"]), getProductForecast);

export default forecastRouter;
