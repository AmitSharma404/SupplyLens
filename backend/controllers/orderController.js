import PurchaseOrder from "../models/PurchaseOrder.js";
import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";

// @desc    Create a new purchase order
// @route   POST /api/orders
// @access  Private
export const createPurchaseOrder = async (req, res) => {
    try {
        const { supplier, items, expectedDeliveryDate } = req.body;

        if (!supplier || !items || !items.length) {
            return res.status(400).json({ success: false, message: "Please provide supplier and at least one item." });
        }

        // Validate items and calculate totalAmount
        let totalAmount = 0;
        for (const item of items) {
            if (!item.product || !item.quantity || item.unitPrice === undefined) {
                return res.status(400).json({ success: false, message: "Each item must have a product ID, quantity, and unitPrice." });
            }
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${item.product} not found.` });
            }
            totalAmount += Number(item.quantity) * Number(item.unitPrice);
        }

        const purchaseOrder = await PurchaseOrder.create({
            supplier,
            items,
            totalAmount,
            expectedDeliveryDate,
            user: req.user._id
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
        const purchaseOrders = await PurchaseOrder.find({})
            .populate("supplier", "name contactPerson email phone")
            .populate("items.product", "name sku category price")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: purchaseOrders.length, purchaseOrders });
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

        const purchaseOrder = await PurchaseOrder.findById(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ success: false, message: "Purchase order not found." });
        }

        // Check if status is transitioning to delivered
        const prevStatus = purchaseOrder.status;
        if (status === "delivered" && prevStatus !== "delivered") {
            // Process and reconcile stock for all items
            for (const item of purchaseOrder.items) {
                const product = await Product.findById(item.product);
                if (product) {
                    // Update product stock
                    product.stockQuantity += Number(item.quantity);
                    await product.save();

                    // Create log movement
                    await StockMovement.create({
                        product: product._id,
                        type: "in",
                        quantity: Number(item.quantity),
                        reason: `Purchase Order Delivered: ${purchaseOrder._id}`,
                        user: req.user._id
                    });
                }
            }
        }

        purchaseOrder.status = status;
        await purchaseOrder.save();

        res.status(200).json({ success: true, purchaseOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};
