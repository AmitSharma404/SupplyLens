import express from "express";
import {
    createPurchaseOrder,
    getPurchaseOrders,
    updateOrderStatus
} from "../controllers/orderController.js";
import { protectedRoute, adminRoute } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.route("/")
    .post(protectedRoute, createPurchaseOrder)
    .get(protectedRoute, getPurchaseOrders);

orderRouter.route("/:id/status")
    .put(protectedRoute, adminRoute, updateOrderStatus);

export default orderRouter;
