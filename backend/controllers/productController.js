import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";


// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    try {
        const { name, sku, description, category, price, stockQuantity, lowStockThreshold, supplier } = req.body;

        if (!name || !sku || price === undefined || !supplier) {
            return res.status(400).json({ success: false, message: "Please provide name, sku, price, and supplier." });
        }

        const productExists = await Product.findOne({ sku });
        if (productExists) {
            return res.status(400).json({ success: false, message: "Product with this SKU already exists." });
        }

        let product = await Product.create({
            name,
            sku,
            description,
            category,
            price,
            stockQuantity,
            lowStockThreshold,
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

        if (!type || !quantity || !reason) {
            return res.status(400).json({ success: false, message: "Please provide type, quantity, and reason." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Adjust stock Quantity
        let newStock = product.stockQuantity;
        if (type === "in") {
            newStock += Number(quantity);
        } else if (type === "out") {
            if (product.stockQuantity < quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock. Current stock is ${product.stockQuantity}.` });
            }
            newStock -= Number(quantity);
        } else if (type === "adjustment") {
            newStock = Number(quantity);
        } else {
            return res.status(400).json({ success: false, message: "Invalid movement type. Must be 'in', 'out', or 'adjustment'." });
        }

        // Create the movement log
        const movement = await StockMovement.create({
            product: productId,
            type,
            quantity: Number(quantity),
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

