
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import appRouter from './Routes/auth.routes.js';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials: true}));

import { connetDB } from './DB/connection.js';
connetDB();

//api endpoints
// routes

app.use('/api/auth', appRouter);

app.get('/api/auth', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});