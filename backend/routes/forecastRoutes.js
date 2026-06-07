import express from "express";
import { getProductForecast } from "../controllers/forecastController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const forecastRouter = express.Router();

forecastRouter.get("/:productId", protect, authorize(["manager", "admin"]), getProductForecast);

export default forecastRouter;
