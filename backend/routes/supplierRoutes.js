import express from "express";
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    getSupplierScoreBreakdown
} from "../controllers/supplierController.js";
import { protectedRoute, verifyRole } from "../middleware/authMiddleware.js";

const supplierRouter = express.Router();

supplierRouter.route("/")
    .post(protectedRoute, createSupplier) // Normal users can create
    .get(protectedRoute, getSuppliers);

supplierRouter.route("/:id")
    .get(protectedRoute, getSupplierById)
    .put(protectedRoute, verifyRole(["admin"]), updateSupplier)
    .delete(protectedRoute, verifyRole(["admin"]), deleteSupplier);

supplierRouter.route("/:id/score-breakdown")
    .get(protectedRoute, getSupplierScoreBreakdown);

export default supplierRouter;
