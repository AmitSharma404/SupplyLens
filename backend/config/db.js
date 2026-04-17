

import mongoose from "mongoose";

export const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected", mongoose.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}