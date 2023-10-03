import express from 'express';
import { getProducts, addProduct, getProductById, updateProductById, deleteProductById } from '../../dao/mongodb/controllers/products.controller.js';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', addProduct);
productsRouter.get('/:pid', getProductById);
productsRouter.put('/:pid', updateProductById);
productsRouter.delete('/:pid', deleteProductById);

export default productsRouter;