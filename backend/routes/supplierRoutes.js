import express from "express";
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    getSupplierScoreBreakdown
} from "../controllers/supplierController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const supplierRouter = express.Router();

supplierRouter.route("/")
    .post(protect, authorize(["admin", "manager"]), createSupplier)
    .get(protect, getSuppliers);

supplierRouter.route("/:id")
    .get(protect, getSupplierById)
    .put(protect, authorize(["admin", "manager"]), updateSupplier)
    .delete(protect, authorize(["admin"]), deleteSupplier);

supplierRouter.route("/:id/score-breakdown")
    .get(protect, getSupplierScoreBreakdown);

export default supplierRouter;
