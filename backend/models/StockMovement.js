import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    type: {
        type: String,
        enum: ["in", "out", "adjustment", "IN", "OUT", "ADJUSTMENT", "SOLD", "RETURNED", "DAMAGED", "TRANSFERRED"],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    previousStock: {
        type: Number,
        required: true
    },
    newStock: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true // e.g., "Supplier Shipment", "Sale", "Damage", "Manual Correction"
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    organization: {
        type: String,
        default: 'Legacy Workspace'
    }
}, { timestamps: true });

// Pre-validate hook for initial field synchronization
stockMovementSchema.pre('validate', function() {
    if (this.productId !== undefined && this.product === undefined) {
        this.product = this.productId;
    } else if (this.product !== undefined && this.productId === undefined) {
        this.productId = this.product;
    }

    if (this.performedBy !== undefined && this.user === undefined) {
        this.user = this.performedBy;
    } else if (this.user !== undefined && this.performedBy === undefined) {
        this.performedBy = this.user;
    }
});

// Pre-save hook to keep fields in sync upon modifications
stockMovementSchema.pre('save', function() {
    if (this.isModified('productId')) {
        this.product = this.productId;
    } else if (this.isModified('product')) {
        this.productId = this.product;
    }

    if (this.isModified('performedBy')) {
        this.user = this.performedBy;
    } else if (this.isModified('user')) {
        this.performedBy = this.user;
    }
});

stockMovementSchema.index({ productId: 1, createdAt: -1 });
stockMovementSchema.index({ type: 1, createdAt: -1 });

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);

export default StockMovement;
