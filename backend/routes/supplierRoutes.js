import express from "express";
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} from "../controllers/supplierController.js";
import { protectedRoute, adminRoute } from "../middleware/authMiddleware.js";

const supplierRouter = express.Router();

supplierRouter.route("/")
    .post(protectedRoute, createSupplier) // Normal users can create
    .get(protectedRoute, getSuppliers);

supplierRouter.route("/:id")
    .get(protectedRoute, getSupplierById)
    .put(protectedRoute, adminRoute, updateSupplier) // Admin only
    .delete(protectedRoute, adminRoute, deleteSupplier); // Admin only

export default supplierRouter;
