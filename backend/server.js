
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import appRouter from './Routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import supplierRoute from './Routes/supplier.route.js';
import orderRouter from './Routes/order.routes.js';
const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:FRONTEND_URL,credentials:true}));

import { connectDB } from './config/db.js';
connectDB();

//api endpoints
// routes

app.use('/api/auth', appRouter);

app.get('/api/auth', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});