import PurchaseOrder from "../models/PurchaseOrder.js";
import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Supplier from "../models/Supplier.js";
import Notification from "../models/Notification.js";
import { calculateReorderPoint, recalculateSupplierScore } from "../utils/inventoryUtils.js";

// @desc    Create a new purchase order
// @route   POST /api/orders
// @access  Private
export const createPurchaseOrder = async (req, res) => {
    try {
        const { supplier, items, expectedDeliveryDate } = req.body;

        if (!supplier || !items || !items.length) {
            return res.status(400).json({ success: false, message: "Please provide supplier and at least one item." });
        }

        const supplierExists = await Supplier.findOne({ _id: supplier, organization: req.user.organization });
        if (!supplierExists) {
            return res.status(404).json({ success: false, message: "Supplier not found." });
        }

        // Validate items and calculate totalAmount
        let totalAmount = 0;
        for (const item of items) {
            if (!item.product || item.quantity === undefined || item.unitPrice === undefined) {
                return res.status(400).json({ success: false, message: "Each item must have a product ID, quantity, and unitPrice." });
            }
            const qty = Number(item.quantity);
            const price = Number(item.unitPrice);
            if (isNaN(qty) || qty <= 0 || isNaN(price) || price < 0) {
                return res.status(400).json({ success: false, message: "Quantity must be a valid number greater than 0, and unit price must be a valid non-negative number." });
            }
            const product = await Product.findOne({ _id: item.product, organization: req.user.organization });
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${item.product} not found.` });
            }
            totalAmount += qty * price;
        }

        const purchaseOrder = await PurchaseOrder.create({
            supplier,
            items,
            totalAmount,
            expectedDeliveryDate,
            user: req.user._id,
            organization: req.user.organization
        });

        res.status(201).json({ success: true, purchaseOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Get all purchase orders
// @route   GET /api/orders
// @access  Private
export const getPurchaseOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await PurchaseOrder.countDocuments({ organization: req.user.organization });
        const purchaseOrders = await PurchaseOrder.find({ organization: req.user.organization })
            .populate("supplier", "name contactPerson email phone")
            .populate("items.product", "name sku category price")
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ 
            success: true, 
            data: purchaseOrders,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Update purchase order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["pending", "shipped", "delivered", "cancelled"];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Please provide a valid status: pending, shipped, delivered, cancelled." });
        }

        const purchaseOrder = await PurchaseOrder.findOne({ _id: req.params.id, organization: req.user.organization });
        if (!purchaseOrder) {
            return res.status(404).json({ success: false, message: "Purchase order not found." });
        }

        // Enforce terminal status transition rules
        const prevStatus = purchaseOrder.status;
        if (prevStatus === "delivered") {
            return res.status(400).json({ success: false, message: "Delivered purchase orders cannot be modified." });
        }
        if (prevStatus === "cancelled") {
            return res.status(400).json({ success: false, message: "Cancelled purchase orders cannot be modified." });
        }

        // Check if status is transitioning to delivered
        if (status === "delivered" && prevStatus !== "delivered") {
            // Process and reconcile stock for all items
            for (const item of purchaseOrder.items) {
                const product = await Product.findOne({ _id: item.product, organization: req.user.organization });
                if (product) {
                    const previousStock = product.currentStock;
                    const parsedQuantity = Number(item.quantity);
                    const newStock = previousStock + parsedQuantity;
                    
                    // Update product stock
                    product.currentStock = newStock;
                    product.stockQuantity = newStock;
                    await product.save();

                    // Create log movement
                    await StockMovement.create({
                        productId: product._id,
                        product: product._id,
                        type: "IN",
                        quantity: parsedQuantity,
                        previousStock,
                        newStock,
                        reason: `Order #${purchaseOrder._id} delivered`,
                        performedBy: req.user._id,
                        user: req.user._id,
                        organization: req.user.organization
                    });

                    // Recalculate reorderPoint
                    await calculateReorderPoint(product._id);

                    // Mark REORDER_RECOMMENDED alerts as read for this product
                    await Notification.updateMany(
                        { productId: product._id, type: "REORDER_RECOMMENDED", read: false, organization: req.user.organization },
                        { $set: { read: true } }
                    );
                }
            }
            
            // Recalculate supplier score
            await recalculateSupplierScore(purchaseOrder.supplier);
        }

        purchaseOrder.status = status;
        await purchaseOrder.save();

        res.status(200).json({ success: true, purchaseOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};
