import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";

// @desc    Stock In (Receive Inventory)
// @route   POST /api/stock/in
// @access  Private
export const stockIn = async (req, res) => {
    try {
        const { productId, quantity, reason } = req.body;

        if (!productId || quantity === undefined || !reason) {
            return res.status(400).json({
                success: false,
                message: "Please provide productId, quantity, and reason."
            });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a valid positive number."
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const previousStock = product.currentStock;
        const newStock = previousStock + parsedQuantity;

        // Create log record
        const movement = await StockMovement.create({
            productId,
            type: "IN",
            quantity: parsedQuantity,
            previousStock,
            newStock,
            reason,
            performedBy: req.user._id
        });

        // Update product stock levels
        product.currentStock = newStock;
        await product.save();

        res.status(201).json({
            success: true,
            data: {
                movement,
                currentStock: newStock
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

// @desc    Stock Out (Reduce Inventory / Sales)
// @route   POST /api/stock/out
// @access  Private
export const stockOut = async (req, res) => {
    try {
        const { productId, quantity, reason } = req.body;

        if (!productId || quantity === undefined || !reason) {
            return res.status(400).json({
                success: false,
                message: "Please provide productId, quantity, and reason."
            });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a valid positive number."
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        if (product.currentStock < parsedQuantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Current stock is ${product.currentStock}.`
            });
        }

        const previousStock = product.currentStock;
        const newStock = previousStock - parsedQuantity;

        // Create log record
        const movement = await StockMovement.create({
            productId,
            type: "OUT",
            quantity: parsedQuantity,
            previousStock,
            newStock,
            reason,
            performedBy: req.user._id
        });

        // Update product stock levels
        product.currentStock = newStock;
        await product.save();

        res.status(201).json({
            success: true,
            data: {
                movement,
                currentStock: newStock
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

// @desc    Get Stock History for a specific product
// @route   GET /api/stock/history/:productId
// @access  Private
export const getStockHistory = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const movements = await StockMovement.find({ productId })
            .populate("performedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: movements
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};
