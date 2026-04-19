
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import authRouter from './Routes/auth.routes.js';
import productRouter from './Routes/product.routes.js';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:FRONTEND_URL,credentials:true}));

import { connetDB } from './DB/connection.js';
connetDB();

//api endpoints
// routes

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter); // Assuming you have product routes defined in productRouter as well

app.get('/api/auth', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});