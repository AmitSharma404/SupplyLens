import express from "express";
import { stockIn, stockOut, getStockHistory, stockSell, stockAdjust } from "../controllers/stockController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const stockRouter = express.Router();

stockRouter.post("/in", protect, stockIn);
stockRouter.post("/out", protect, stockOut);
stockRouter.post("/sell", protect, authorize(["staff", "manager", "admin"]), stockSell);
stockRouter.post("/adjust", protect, authorize(["staff", "manager", "admin"]), stockAdjust);
stockRouter.get("/history/:productId", protect, getStockHistory);

export default stockRouter;
