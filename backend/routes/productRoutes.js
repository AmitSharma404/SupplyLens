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
import { protect, authorize } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.route("/")
    .post(protect, authorize(["admin", "manager"]), createProduct)
    .get(protect, getProducts);

productRouter.route("/:id")
    .get(protect, getProductById)
    .put(protect, authorize(["admin", "manager"]), updateProduct)
    .delete(protect, authorize(["admin"]), deleteProduct);

productRouter.route("/:id/movements")
    .post(protect, createStockMovement)
    .get(protect, getProductMovements);

productRouter.route("/:id/reorder-point")
    .get(protect, getReorderPoint);


export default productRouter;
