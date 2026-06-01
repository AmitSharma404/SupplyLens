
import express from 'express';
import { addSupplier } from '../Controllers/supplierController.js';
const supplierRoute = express.Router();

supplierRoute.post("/add",addSupplier)

export default supplierRoute;