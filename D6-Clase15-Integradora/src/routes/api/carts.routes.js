import express from 'express';
import { createCart, addProductToCart, removeProductFromCart, deleteCart, getCart, getCarts } from '../../dao/mongodb/controllers/carts.controller.js';

const cartsRouter = express.Router();

// Rutas para los carritos
cartsRouter.get('/:cartId', getCart);
cartsRouter.get('/', getCarts);
cartsRouter.post('/', createCart);
cartsRouter.post('/:cartId/products', addProductToCart);
cartsRouter.delete('/:cartId/products/:productId', removeProductFromCart);
cartsRouter.delete('/:cartId', deleteCart);

export default cartsRouter;