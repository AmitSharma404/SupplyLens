import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
    },
    email: {
      type: String,
      required:true,
      unique: true,
    },
    phone: {
      type: String,
      required:true,
    },
    address: {
      type: String,
      required:true,
    },
    contactPerson: {
      type: Number,
      required:true,
    },
    averageDeliveryDate: {
      type: String,
      required:true,
    },
    relibilityScore: {
      type: Number,
      required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
  },
  { timestamps: true },
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
