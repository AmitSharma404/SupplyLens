import Product from "../Models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        // Fetch products from the database
        const products = await Product.find(); // Assuming you have a Product model defined
        res.status(200).json({
            msg:"Products fetched successfully",
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, sku, category, description, price, minimumStockLevel, safetyStock, supplierId } = req.body;

        
        const newProduct = new Product({
            name,
            sku,
            category,
            description,
            price,
            minimumStockLevel,
            safetyStock,
            supplierId
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json({
            msg: "Product added successfully",
            product: savedProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}