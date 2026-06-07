import Supplier from "../Models/supplierModels.js";
export const addSupplier = async (req, res) => {
  const {
    name,
    email,
    address,
    phone,
    contactPerson,
    averageDeliveryDate,
    relibilityScore,
  } = req.body;

  const existingSupplier = await Supplier.findOne({ name });
  if (existingSupplier) {
    return res.status(400).json({ 
        message: "Supplier already exists" 
    });
  }

  try {
    // Create a new supplier document
    const newSupplier = new Supplier({
      name,
      email,
      address,
      phone,
      contactPerson,
      averageDeliveryDate,
      relibilityScore,
    });

        const supplierExists = await Supplier.findOne({ email, organization: req.user.organization });
        if (supplierExists) {
            return res.status(400).json({ success: false, message: "Supplier with this email already exists." });
        }

        const supplier = await Supplier.create({
            name,
            contactPerson,
            email,
            phone,
            address,
            user: req.user._id,
            organization: req.user.organization
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Supplier.countDocuments({ organization: req.user.organization });
        const suppliers = await Supplier.find({ organization: req.user.organization })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        res.status(200).json({ 
            success: true, 
            data: suppliers,
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

// @desc    Get a single supplier
// @route   GET /api/suppliers/:id
// @access  Private
export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ _id: req.params.id, organization: req.user.organization });

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
        let supplier = await Supplier.findOne({ _id: req.params.id, organization: req.user.organization });

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        supplier = await Supplier.findOneAndUpdate(
            { _id: req.params.id, organization: req.user.organization },
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
        const supplier = await Supplier.findOne({ _id: req.params.id, organization: req.user.organization });

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        await supplier.deleteOne();

        res.status(200).json({ success: true, message: "Supplier removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get supplier score breakdown
// @route   GET /api/suppliers/:id/score-breakdown
// @access  Private
export const getSupplierScoreBreakdown = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const supplier = await Supplier.findOne({ _id: supplierId, organization: req.user.organization });
        if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found." });

        const orders = await PurchaseOrder.find({ supplier: supplierId, status: "delivered", organization: req.user.organization });
        const totalOrders = orders.length;
        
        let onTimeDeliveries = 0;
        for (const order of orders) {
            if (!order.expectedDeliveryDate || order.updatedAt <= order.expectedDeliveryDate) {
                onTimeDeliveries++;
            }
        }
        
        const lateDeliveries = totalOrders - onTimeDeliveries;
        const onTimeRate = totalOrders > 0 ? (onTimeDeliveries / totalOrders) * 100 : 100;
        
        res.status(200).json({
            success: true,
            data: {
                totalOrders,
                onTimeDeliveries,
                lateDeliveries,
                onTimeRate: Math.round(onTimeRate),
                reliabilityScore: supplier.reliabilityScore
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
