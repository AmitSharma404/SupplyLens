import express from 'express';
import { getProducts, addProduct } from '../Controllers/productController.js';
const productRouter = express.Router();


productRouter.get('/getproducts',getProducts);
productRouter.post('/addproducts',addProduct);


export default productRouter;