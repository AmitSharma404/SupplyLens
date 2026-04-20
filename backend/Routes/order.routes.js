import express from "express";
import { createOrder } from "../Controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);


export default orderRouter;