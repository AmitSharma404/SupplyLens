import express from "express";
import { stockIn, stockOut, getStockHistory, stockSell, stockAdjust } from "../controllers/stockController.js";
import { protectedRoute, verifyRole } from "../middleware/authMiddleware.js";

const stockRouter = express.Router();

stockRouter.post("/in", protectedRoute, stockIn);
stockRouter.post("/out", protectedRoute, stockOut);
stockRouter.post("/sell", protectedRoute, verifyRole(["warehouse_staff", "manager", "admin"]), stockSell);
stockRouter.post("/adjust", protectedRoute, verifyRole(["warehouse_staff", "manager", "admin"]), stockAdjust);
stockRouter.get("/history/:productId", protectedRoute, getStockHistory);

export default stockRouter;
