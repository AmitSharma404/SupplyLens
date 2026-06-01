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
    .post(protectedRoute, verifyRole(["admin", "manager"]), createProduct)
    .get(protectedRoute, getProducts);

productRouter.route("/:id")
    .get(protectedRoute, getProductById)
    .put(protectedRoute, verifyRole(["admin", "manager"]), updateProduct)
    .delete(protectedRoute, verifyRole(["admin"]), deleteProduct);

productRouter.route("/:id/movements")
    .post(protectedRoute, createStockMovement)
    .get(protectedRoute, getProductMovements);

productRouter.route("/:id/reorder-point")
    .get(protectedRoute, getReorderPoint);


export default productRouter;
