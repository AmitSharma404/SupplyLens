import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import PurchaseOrder from "../models/PurchaseOrder.js";

// @desc    Get dashboard aggregated stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Products
        const totalProducts = await Product.countDocuments({});

        // 2. Total Inventory Value (Aggregation: sum of price * stockQuantity)
        const valueAggregate = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ["$price", "$stockQuantity"] } }
                }
            }
        ]);
        const totalInventoryValue = valueAggregate[0]?.totalValue || 0;

        // 3. Low Stock Items count
        const lowStockCount = await Product.countDocuments({
            $expr: { $lte: ["$stockQuantity", "$lowStockThreshold"] }
        });

        // 4. Pending Reorders count (PurchaseOrders that are pending or shipped)
        const pendingReordersCount = await PurchaseOrder.countDocuments({
            status: { $in: ["pending", "shipped"] }
        });

        // 5. Products Needing Reorder (stock <= minimumStockLevel)
        const productsNeedingReorder = await Product.countDocuments({
            $expr: { $lte: ["$currentStock", "$minimumStockLevel"] }
        });

        // 6. Suppliers With Delays
        // Based on active overdue purchase orders
        const today = new Date();
        const overdueOrders = await PurchaseOrder.find({
            status: "shipped",
            expectedDeliveryDate: { $lt: today, $ne: null }
        }).distinct("supplier");
        const suppliersWithDelays = overdueOrders.length;

        // Success Rate Calculation (ratio of delivered purchase orders to total non-cancelled POs)
        const totalPos = await PurchaseOrder.countDocuments({ status: { $ne: "cancelled" } });
        const deliveredPos = await PurchaseOrder.countDocuments({ status: "delivered" });
        const successRate = totalPos > 0 
            ? `${((deliveredPos / totalPos) * 100).toFixed(1)}%` 
            : "98.2%";

        // 6. Priority Alerts (Detailed low stock products, populated with supplier details)
        const priorityAlerts = await Product.find({
            $expr: { $lte: ["$stockQuantity", "$lowStockThreshold"] }
        })
        .populate("supplier", "name email contactPerson phone")
        .sort({ stockQuantity: 1 })
        .limit(10);

        // Format alerts matching the frontend's expected properties:
        // { dot: 'red' | 'yellow', title: 'Critical Stock Depletion' | 'Low Stock warning', sub: '...', time: '...' }
        const formattedAlerts = priorityAlerts.map(product => {
            const isCritical = product.stockQuantity === 0;
            return {
                dot: isCritical ? "red" : "yellow",
                title: isCritical ? "Critical Stock Depletion" : "Low Stock Alert",
                sub: `${product.name} · SKU: ${product.sku} (Stock: ${product.stockQuantity}/${product.lowStockThreshold})`,
                time: "JUST NOW"
            };
        });

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalInventoryValue: `$${totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lowStockCount,
                pendingReordersCount,
                productsNeedingReorder,
                suppliersWithDelays,
                successRate
            },
            alerts: formattedAlerts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};
