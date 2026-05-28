import express from "express";
import { stockIn, stockOut, getStockHistory } from "../controllers/stockController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const stockRouter = express.Router();

stockRouter.post("/in", protectedRoute, stockIn);
stockRouter.post("/out", protectedRoute, stockOut);
stockRouter.get("/history/:productId", protectedRoute, getStockHistory);

export default stockRouter;
