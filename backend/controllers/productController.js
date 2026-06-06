import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Supplier from "../models/Supplier.js";
import { calculateReorderPoint } from "../utils/inventoryUtils.js";


// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    try {
        // Synchronize request body parameters
        if (req.body.unitPrice !== undefined && req.body.price === undefined) {
            req.body.price = req.body.unitPrice;
        } else if (req.body.price !== undefined && req.body.unitPrice === undefined) {
            req.body.unitPrice = req.body.price;
        }

        if (req.body.currentStock !== undefined && req.body.stockQuantity === undefined) {
            req.body.stockQuantity = req.body.currentStock;
        } else if (req.body.stockQuantity !== undefined && req.body.currentStock === undefined) {
            req.body.currentStock = req.body.stockQuantity;
        }

        if (req.body.minimumStockLevel !== undefined && req.body.lowStockThreshold === undefined) {
            req.body.lowStockThreshold = req.body.minimumStockLevel;
        } else if (req.body.lowStockThreshold !== undefined && req.body.minimumStockLevel === undefined) {
            req.body.minimumStockLevel = req.body.lowStockThreshold;
        }

        if (req.body.supplierId !== undefined && req.body.supplier === undefined) {
            req.body.supplier = req.body.supplierId;
        } else if (req.body.supplier !== undefined && req.body.supplierId === undefined) {
            req.body.supplierId = req.body.supplier;
        }

        const { name, sku, description, category, price, stockQuantity, lowStockThreshold, supplier } = req.body;

        if (!name || !sku || price === undefined || !supplier) {
            return res.status(400).json({ success: false, message: "Please provide name, sku, price, and supplier." });
        }

        const numericPrice = Number(price);
        const numericStock = stockQuantity !== undefined ? Number(stockQuantity) : 0;
        const numericThreshold = lowStockThreshold !== undefined ? Number(lowStockThreshold) : 5;

        if (isNaN(numericPrice) || numericPrice < 0) {
            return res.status(400).json({ success: false, message: "Price must be a valid non-negative number." });
        }
        if (isNaN(numericStock) || numericStock < 0) {
            return res.status(400).json({ success: false, message: "Stock quantity must be a valid non-negative number." });
        }
        if (isNaN(numericThreshold) || numericThreshold < 0) {
            return res.status(400).json({ success: false, message: "Low stock threshold must be a valid non-negative number." });
        }

        const productExists = await Product.findOne({ sku, organization: req.user.organization });
        if (productExists) {
            return res.status(400).json({ success: false, message: "Product with this SKU already exists." });
        }

        const supplierExists = await Supplier.findOne({ _id: supplier, organization: req.user.organization });
        if (!supplierExists) {
            return res.status(404).json({ success: false, message: "Supplier not found." });
        }

        let product = await Product.create({
            name,
            sku,
            description,
            category,
            price: numericPrice,
            stockQuantity: numericStock,
            lowStockThreshold: numericThreshold,
            supplier,
            user: req.user._id,
            organization: req.user.organization
        });

        product = await product.populate("supplier", "name email contactPerson phone");

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

        const total = await Product.countDocuments({ organization: req.user.organization });
        const products = await Product.find({ organization: req.user.organization })
            .populate("supplier", "name email contactPerson phone")
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ 
            success: true, 
            data: products,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get a single product
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, organization: req.user.organization }).populate("supplier", "name email contactPerson phone");

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        // Synchronize request body parameters
        if (req.body.unitPrice !== undefined && req.body.price === undefined) {
            req.body.price = req.body.unitPrice;
        } else if (req.body.price !== undefined && req.body.unitPrice === undefined) {
            req.body.unitPrice = req.body.price;
        }

        if (req.body.currentStock !== undefined && req.body.stockQuantity === undefined) {
            req.body.stockQuantity = req.body.currentStock;
        } else if (req.body.stockQuantity !== undefined && req.body.currentStock === undefined) {
            req.body.currentStock = req.body.stockQuantity;
        }

        if (req.body.minimumStockLevel !== undefined && req.body.lowStockThreshold === undefined) {
            req.body.lowStockThreshold = req.body.minimumStockLevel;
        } else if (req.body.lowStockThreshold !== undefined && req.body.minimumStockLevel === undefined) {
            req.body.minimumStockLevel = req.body.lowStockThreshold;
        }

        if (req.body.supplierId !== undefined && req.body.supplier === undefined) {
            req.body.supplier = req.body.supplierId;
        } else if (req.body.supplier !== undefined && req.body.supplierId === undefined) {
            req.body.supplierId = req.body.supplier;
        }

        let product = await Product.findOne({ _id: req.params.id, organization: req.user.organization });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (req.body.supplier !== undefined) {
            const supplierExists = await Supplier.findOne({ _id: req.body.supplier, organization: req.user.organization });
            if (!supplierExists) {
                return res.status(404).json({ success: false, message: "Supplier not found." });
            }
        }

        if (req.body.price !== undefined) {
            const price = Number(req.body.price);
            if (isNaN(price) || price < 0) {
                return res.status(400).json({ success: false, message: "Price must be a valid non-negative number." });
            }
            req.body.price = price;
        }

        if (req.body.stockQuantity !== undefined) {
            const stockQuantity = Number(req.body.stockQuantity);
            if (isNaN(stockQuantity) || stockQuantity < 0) {
                return res.status(400).json({ success: false, message: "Stock quantity must be a valid non-negative number." });
            }
            req.body.stockQuantity = stockQuantity;
        }

        if (req.body.lowStockThreshold !== undefined) {
            const lowStockThreshold = Number(req.body.lowStockThreshold);
            if (isNaN(lowStockThreshold) || lowStockThreshold < 0) {
                return res.status(400).json({ success: false, message: "Low stock threshold must be a valid non-negative number." });
            }
            req.body.lowStockThreshold = lowStockThreshold;
        }

        product = await Product.findOneAndUpdate(
            { _id: req.params.id, organization: req.user.organization },
            req.body,
            { new: true, runValidators: true }
        ).populate("supplier", "name email contactPerson phone");

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, organization: req.user.organization });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.deleteOne();

        res.status(200).json({ success: true, message: "Product removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Create a new stock movement
// @route   POST /api/products/:id/movements
// @access  Private
export const createStockMovement = async (req, res) => {
    try {
        const { type, quantity, reason } = req.body;
        const productId = req.params.id;

        if (type === undefined || quantity === undefined || !reason) {
            return res.status(400).json({ success: false, message: "Please provide type, quantity, and reason." });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity < 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a valid non-negative number." });
        }

        const product = await Product.findOne({ _id: productId, organization: req.user.organization });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Adjust stock Quantity
        let newStock = product.stockQuantity;
        if (type === "in") {
            newStock += parsedQuantity;
        } else if (type === "out") {
            if (product.stockQuantity < parsedQuantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock. Current stock is ${product.stockQuantity}.` });
            }
            newStock -= parsedQuantity;
        } else if (type === "adjustment") {
            newStock = parsedQuantity;
        } else {
            return res.status(400).json({ success: false, message: "Invalid movement type. Must be 'in', 'out', or 'adjustment'." });
        }

        // Create the movement log
        const movement = await StockMovement.create({
            product: productId,
            type,
            quantity: parsedQuantity,
            reason,
            user: req.user._id,
            organization: req.user.organization
        });

        // Update product stock quantity
        product.stockQuantity = newStock;
        await product.save();

        res.status(201).json({ success: true, movement, currentStock: newStock });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Get all stock movements for a specific product
// @route   GET /api/products/:id/movements
// @access  Private
export const getProductMovements = async (req, res) => {
    try {
        const productId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await StockMovement.countDocuments({ product: productId, organization: req.user.organization });
        const movements = await StockMovement.find({ product: productId, organization: req.user.organization })
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ 
            success: true, 
            data: movements,
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

// @desc    Get reorder point for product
// @route   GET /api/products/:id/reorder-point
// @access  Private
export const getReorderPoint = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ _id: productId, organization: req.user.organization }).populate('supplier');
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        const reorderPoint = await calculateReorderPoint(productId);
        
        // Let's manually calculate average daily demand for the response payload
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const movements = await StockMovement.find({
            productId: product._id,
            organization: req.user.organization,
            type: "SOLD",
            createdAt: { $gte: thirtyDaysAgo }
        });
        const totalSold = movements.reduce((sum, mov) => sum + mov.quantity, 0);
        const averageDailyDemand = totalSold / 30;

        res.status(200).json({
            success: true,
            data: {
                reorderPoint,
                averageDailyDemand,
                supplierLeadDays: product.supplier ? product.supplier.averageDeliveryDays : 0,
                safetyStock: product.safetyStock
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

