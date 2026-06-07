import Order from "../Models/OrderModels.js";

export const createOrder = async (req, res) => {
  const {
    orderNumber,
    supplierId,
    productId,
    quantityOrdered,
    unitPrice,
    totalCost,
    expectedDeliveryDate,
  } = req.body;

  try {
    const existingOrder = await Order.findOne({ orderNumber });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists" });
    }

    const newOrder = new Order({
      orderNumber,
      supplierId,
      productId,
      quantityOrdered,
      unitPrice,
      totalCost,
      expectedDeliveryDate,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      msg: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


