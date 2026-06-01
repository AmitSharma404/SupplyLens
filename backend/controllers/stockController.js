import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Notification from "../models/Notification.js";
import { calculateReorderPoint } from "../utils/inventoryUtils.js";

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

// @desc    Record a Sale
// @route   POST /api/stock/sell
// @access  Private
export const stockSell = async (req, res) => {
    try {
        const { productId, quantity, saleDate, customerRef, note } = req.body;
        
        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: "Please provide productId and quantity." });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found." });

        if (product.currentStock < parsedQuantity) {
            return res.status(400).json({ success: false, message: `Insufficient stock. Current stock is ${product.currentStock}.` });
        }

        const previousStock = product.currentStock;
        const newStock = previousStock - parsedQuantity;

        const movement = await StockMovement.create({
            productId,
            product: productId,
            type: "SOLD",
            quantity: parsedQuantity,
            previousStock,
            newStock,
            reason: customerRef ? `Sale: ${customerRef}` : "Sale",
            performedBy: req.user._id,
            user: req.user._id
        });

        product.currentStock = newStock;
        product.stockQuantity = newStock;
        await product.save();

        // Check thresholds and create alerts
        if (newStock <= product.minimumStockLevel) {
            await Notification.create({
                type: "LOW_STOCK",
                message: `Low Stock Alert: ${product.name} has reached critical level (${newStock} units left).`,
                priority: "HIGH",
                productId: product._id
            });
        } else if (newStock <= product.reorderPoint) {
            await Notification.create({
                type: "REORDER_RECOMMENDED",
                message: `Reorder Recommended: ${product.name} is below reorder point (${newStock} units left).`,
                priority: "MEDIUM",
                productId: product._id
            });
        }

        // Recalculate reorder point
        await calculateReorderPoint(product._id);

        res.status(201).json({
            success: true,
            data: { movement, currentStock: newStock }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Adjust Stock
// @route   POST /api/stock/adjust
// @access  Private
export const stockAdjust = async (req, res) => {
    try {
        const { productId, adjustmentType, quantity, reason, notes } = req.body;
        
        if (!productId || !adjustmentType || !quantity || !reason) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found." });

        const previousStock = product.currentStock;
        const newStock = adjustmentType === "ADD" ? previousStock + parsedQuantity : previousStock - parsedQuantity;

        if (newStock < 0) {
            return res.status(400).json({ success: false, message: "Adjustment would result in negative stock." });
        }

        const movement = await StockMovement.create({
            productId,
            product: productId,
            type: "ADJUSTMENT",
            quantity: parsedQuantity,
            previousStock,
            newStock,
            reason: notes ? `${reason} - ${notes}` : reason,
            performedBy: req.user._id,
            user: req.user._id
        });

        product.currentStock = newStock;
        product.stockQuantity = newStock;
        await product.save();

        res.status(201).json({
            success: true,
            data: { movement, currentStock: newStock }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};
