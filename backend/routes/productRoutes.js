import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createStockMovement,
    getProductMovements
} from "../controllers/productController.js";
import { protectedRoute, adminRoute } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.route("/")
    .post(protectedRoute, createProduct) // Normal users can create for now (can change if needed)
    .get(protectedRoute, getProducts);

productRouter.route("/:id")
    .get(protectedRoute, getProductById)
    .put(protectedRoute, adminRoute, updateProduct) // Admin only
    .delete(protectedRoute, adminRoute, deleteProduct); // Admin only

productRouter.route("/:id/movements")
    .post(protectedRoute, createStockMovement)
    .get(protectedRoute, getProductMovements);


export default productRouter;
