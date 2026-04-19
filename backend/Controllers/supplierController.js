import Supplier from "../Models/supplierModels.js";
export const addSupplier = async (req,res) => {
    const {name,email,address,phone,contactPerson,averageDeliveryDate,relibilityScore} = req.body;

    const existingSupplier = await Supplier.findOne({name});
    if(existingSupplier){
        return res.status(400).json({message:"Supplier already exists"});
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
            relibilityScore
        });

        // Save the new supplier to the database
        const savedSupplier = await newSupplier.save();

        res.status(201).json({
            msg: "Supplier added successfully",
            supplier: savedSupplier
        });
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
      
