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
      type: Number,
      required:true,
    },
    relibilityScore: {
      type: Number,
      required:true,
    },
  },
  { timestamps: true },
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
