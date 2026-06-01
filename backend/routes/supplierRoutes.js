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
    .post(protectedRoute, verifyRole(["admin", "manager"]), createSupplier)
    .get(protectedRoute, getSuppliers);

supplierRouter.route("/:id")
    .get(protectedRoute, getSupplierById)
    .put(protectedRoute, verifyRole(["admin", "manager"]), updateSupplier)
    .delete(protectedRoute, verifyRole(["admin"]), deleteSupplier);

supplierRouter.route("/:id/score-breakdown")
    .get(protectedRoute, getSupplierScoreBreakdown);

export default supplierRouter;
