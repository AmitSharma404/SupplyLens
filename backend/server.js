
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import appRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import supplierRouter from './routes/supplierRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:FRONTEND_URL,credentials:true}));

import { connetDB } from './config/db.js';
connetDB();

//api endpoints
// routes

app.use('/api/auth', appRouter);
app.use('/api/products', productRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/orders', orderRouter);
app.use('/api/dashboard', dashboardRouter);




app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});