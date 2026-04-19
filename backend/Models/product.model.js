import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    sku:{
        type: String,
        required:true,
        unique: true,
    },
    category:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    minimumStockLevel:{
        type: Number,
        required:true,
    },
    safetyStock:{
        type: Number,
        required:true,
    },
    supplierId:{
        type: String,
        ref: 'Supplier',
        required:true,
    },
},{timestamps:true});

const Product = mongoose.model("Product", productSchema);

export default Product;