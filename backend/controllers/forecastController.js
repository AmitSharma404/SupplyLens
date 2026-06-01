import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";

// @desc    Get demand forecast for a product
// @route   GET /api/forecast/:productId
// @access  Private
export const getProductForecast = async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Fetch past 90 days of SOLD movements
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const movements = await StockMovement.find({
            productId: product._id,
            type: "SOLD",
            createdAt: { $gte: ninetyDaysAgo }
        }).sort({ createdAt: 1 });

        // Group by week (7-day buckets)
        // For simplicity, we just bucket by week index starting from 90 days ago
        const weeklyData = [];
        for (let i = 0; i < 13; i++) {
            weeklyData.push({ weekStart: new Date(ninetyDaysAgo.getTime() + (i * 7 * 24 * 60 * 60 * 1000)), totalSold: 0 });
        }

        movements.forEach(m => {
            const diffTime = Math.abs(m.createdAt - ninetyDaysAgo);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let weekIndex = Math.floor(diffDays / 7);
            if (weekIndex > 12) weekIndex = 12; // cap to 12
            weeklyData[weekIndex].totalSold += m.quantity;
        });

        const dataPointsUsed = movements.length;
        const totalWeeksActive = weeklyData.filter(w => w.totalSold > 0).length;

        // 1. Moving Average (4-week window)
        let maPredictedWeeklyDemand = 0;
        if (totalWeeksActive > 0) {
            const last4Weeks = weeklyData.slice(-4);
            const sumLast4 = last4Weeks.reduce((sum, w) => sum + w.totalSold, 0);
            maPredictedWeeklyDemand = Math.round(sumLast4 / 4);
        }

        // 2. Exponential Smoothing (alpha = 0.3)
        const alpha = 0.3;
        let esPredictedWeeklyDemand = weeklyData[0]?.totalSold || 0;
        for (let i = 1; i < weeklyData.length; i++) {
            esPredictedWeeklyDemand = (alpha * weeklyData[i].totalSold) + ((1 - alpha) * esPredictedWeeklyDemand);
        }
        esPredictedWeeklyDemand = Math.round(esPredictedWeeklyDemand);

        res.status(200).json({
            success: true,
            data: {
                productId: product._id,
                forecastDate: new Date(),
                methods: {
                    movingAverage: {
                        predictedWeeklyDemand: maPredictedWeeklyDemand,
                        predictedDailyDemand: Math.round(maPredictedWeeklyDemand / 7)
                    },
                    exponentialSmoothing: {
                        predictedWeeklyDemand: esPredictedWeeklyDemand,
                        predictedDailyDemand: Math.round(esPredictedWeeklyDemand / 7)
                    }
                },
                dataPointsUsed,
                confidenceScore: dataPointsUsed > 10 ? 0.8 : (dataPointsUsed > 5 ? 0.5 : 0.2),
                warning: dataPointsUsed < 14 ? "Insufficient data — less than 4 weeks of sales history" : null
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};
