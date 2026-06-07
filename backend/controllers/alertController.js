import Notification from "../models/Notification.js";
import PurchaseOrder from "../models/PurchaseOrder.js";

// @desc    Get all alerts (notifications)
// @route   GET /api/alerts
// @access  Private
export const getAlerts = async (req, res) => {
    try {
        // Run background check for supplier delays on every fetch
        const today = new Date();
        const overdueOrders = await PurchaseOrder.find({
            status: "shipped",
            expectedDeliveryDate: { $lt: today, $ne: null },
            organization: req.user.organization
        }).populate("supplier", "name");

        for (const order of overdueOrders) {
            // Check if alert already exists for this order
            const existingAlert = await Notification.findOne({
                type: "SUPPLIER_DELAY",
                message: { $regex: order._id.toString() },
                organization: req.user.organization
            });

            if (!existingAlert) {
                // Determine product id from first item if it exists, otherwise just store null
                const productId = order.items && order.items.length > 0 ? order.items[0].product : null;
                const formattedDate = order.expectedDeliveryDate.toISOString().split('T')[0];
                
                await Notification.create({
                    type: "SUPPLIER_DELAY",
                    message: `Order #${order._id} from ${order.supplier?.name || 'Unknown Supplier'} was expected on ${formattedDate} but has not been marked delivered.`,
                    priority: "HIGH",
                    productId: productId,
                    organization: req.user.organization
                });
            }
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const query = { organization: req.user.organization };
        if (req.query.read !== undefined) {
            query.read = req.query.read === "true";
        }

        const total = await Notification.countDocuments(query);
        const alerts = await Notification.find(query)
            .populate("productId", "name sku")
            .sort({ priority: 1, createdAt: -1 }) // simple sort, might need better logic if enum
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: alerts,
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

// @desc    Mark alert as read
// @route   PUT /api/alerts/:id/read
// @access  Private
export const markAlertRead = async (req, res) => {
    try {
        const alert = await Notification.findOne({ _id: req.params.id, organization: req.user.organization });
        if (!alert) return res.status(404).json({ success: false, message: "Alert not found." });

        alert.read = true;
        await alert.save();

        res.status(200).json({ success: true, data: alert });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};
