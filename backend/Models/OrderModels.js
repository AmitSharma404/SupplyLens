

import mongoose from "mongoose";


export const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    supplierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantityOrdered:{
        type: Number,
        required: true
    },
    unitPrice:{
        type: Number,
        required: true
    },
    totalCost:{
        type: Number,
        required: true
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    expectedDeliveryDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
})

const Order = mongoose.model("Order", OrderSchema);

export default Order;