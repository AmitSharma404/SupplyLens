import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Supplier from "../models/Supplier.js";
import PurchaseOrder from "../models/PurchaseOrder.js";

export const calculateReorderPoint = async (productId) => {
    const product = await Product.findById(productId).populate('supplier');
    if (!product || !product.supplier) return 0;
    
    const supplier = product.supplier;
    
    // Calculate total SOLD quantity in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const movements = await StockMovement.find({
        productId: product._id,
        type: "SOLD",
        createdAt: { $gte: thirtyDaysAgo }
    });
    
    const totalSold = movements.reduce((sum, mov) => sum + mov.quantity, 0);
    const averageDailyDemand = totalSold / 30;
    
    const reorderPoint = Math.ceil((averageDailyDemand * supplier.averageDeliveryDays) + product.safetyStock);
    
    product.reorderPoint = reorderPoint;
    await product.save();
    
    return reorderPoint;
};

export const recalculateSupplierScore = async (supplierId) => {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) return 0;
    
    const orders = await PurchaseOrder.find({ supplier: supplierId, status: "delivered" });
    if (orders.length === 0) return 100; // default if no delivered orders
    
    let onTimeCount = 0;
    for (const order of orders) {
        // Assume updated_at or delivery time compared to expectedDeliveryDate
        // Wait, Order doesn't have deliveredDate. Let's use updatedAt as a proxy for delivery date,
        // or just check if it was marked delivered before or on expectedDeliveryDate.
        // If expectedDeliveryDate is null, we can't judge. Let's just assume on time if no expected date.
        if (!order.expectedDeliveryDate || order.updatedAt <= order.expectedDeliveryDate) {
            onTimeCount++;
        }
    }
    
    const onTimeRate = (onTimeCount / orders.length) * 100;
    supplier.reliabilityScore = Math.round(onTimeRate);
    await supplier.save();
    
    return supplier.reliabilityScore;
};
