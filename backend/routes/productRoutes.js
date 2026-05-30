import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createStockMovement,
    getProductMovements,
    getReorderPoint
} from "../controllers/productController.js";
import { protectedRoute, verifyRole } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.route("/")
    .post(protectedRoute, createProduct) // Normal users can create for now (can change if needed)
    .get(protectedRoute, getProducts);

productRouter.route("/:id")
    .get(protectedRoute, getProductById)
    .put(protectedRoute, verifyRole(["admin"]), updateProduct)
    .delete(protectedRoute, verifyRole(["admin"]), deleteProduct);

productRouter.route("/:id/movements")
    .post(protectedRoute, createStockMovement)
    .get(protectedRoute, getProductMovements);

productRouter.route("/:id/reorder-point")
    .get(protectedRoute, getReorderPoint);


export default productRouter;
