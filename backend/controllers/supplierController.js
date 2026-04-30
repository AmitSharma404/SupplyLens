import Supplier from "../models/Supplier.js";

// @desc    Create a new supplier
// @route   POST /api/suppliers
// @access  Private
export const createSupplier = async (req, res) => {
    try {
        const { name, contactPerson, email, phone, address } = req.body;

        if (!name || !contactPerson || !email || !phone || !address) {
            return res.status(400).json({ success: false, message: "Please provide all required fields." });
        }

        const supplierExists = await Supplier.findOne({ email });
        if (supplierExists) {
            return res.status(400).json({ success: false, message: "Supplier with this email already exists." });
        }

        const supplier = await Supplier.create({
            name,
            contactPerson,
            email,
            phone,
            address,
            user: req.user._id
        });

        res.status(201).json({ success: true, supplier });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: suppliers.length, suppliers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get a single supplier
// @route   GET /api/suppliers/:id
// @access  Private
export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        res.status(200).json({ success: true, supplier });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private/Admin
export const updateSupplier = async (req, res) => {
    try {
        let supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, supplier });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
};

// @desc    Delete a supplier
// @route   DELETE /api/suppliers/:id
// @access  Private/Admin
export const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        await supplier.deleteOne();

        res.status(200).json({ success: true, message: "Supplier removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};