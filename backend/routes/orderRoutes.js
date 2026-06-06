import express from "express";
import {
    createPurchaseOrder,
    getPurchaseOrders,
    updateOrderStatus
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.route("/")
    .post(protect, authorize(["admin", "manager"]), createPurchaseOrder)
    .get(protect, getPurchaseOrders);

orderRouter.route("/:id/status")
    .put(protect, authorize(["staff", "manager", "admin"]), updateOrderStatus);

export default orderRouter;
