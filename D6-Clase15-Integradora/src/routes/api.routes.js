import express from 'express';
import productsRoutes from './api/products.routes.js';
import cartsRoutes from './api/carts.routes.js';
import chatRoutes from './api/chat.routes.js'

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/chat', chatRoutes);

export default router;