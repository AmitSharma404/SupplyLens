import express from "express";
import {
    createPurchaseOrder,
    getPurchaseOrders,
    updateOrderStatus
} from "../controllers/orderController.js";
import { protectedRoute, verifyRole } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.route("/")
    .post(protectedRoute, verifyRole(["admin", "manager"]), createPurchaseOrder)
    .get(protectedRoute, getPurchaseOrders);

orderRouter.route("/:id/status")
    .put(protectedRoute, verifyRole(["warehouse_staff", "manager", "admin"]), updateOrderStatus);

export default orderRouter;
