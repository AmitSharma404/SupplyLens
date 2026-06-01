import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    averageDeliveryDays: {
        type: Number,
        default: 0,
        min: 0
    },
    reliabilityScore: {
        type: Number,
        default: 100,
        min: 0,
        max: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;