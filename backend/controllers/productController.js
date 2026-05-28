import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Supplier from "../models/Supplier.js";


// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    try {
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

        const productExists = await Product.findOne({ sku });
        if (productExists) {
            return res.status(400).json({ success: false, message: "Product with this SKU already exists." });
        }

        const supplierExists = await Supplier.findById(supplier);
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
            user: req.user._id
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
        const products = await Product.find({}).populate("supplier", "name email contactPerson phone").sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: products.length, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get a single product
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("supplier", "name email contactPerson phone");

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
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (req.body.supplier !== undefined) {
            const supplierExists = await Supplier.findById(req.body.supplier);
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

        product = await Product.findByIdAndUpdate(
            req.params.id,
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
        const product = await Product.findById(req.params.id);

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

        const product = await Product.findById(productId);
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
            user: req.user._id
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
        const movements = await StockMovement.find({ product: productId })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: movements.length, movements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

