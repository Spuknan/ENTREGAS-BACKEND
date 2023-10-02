import express from 'express';
import CartManager from '../../controllers/carts.controller.js';

const cartManager = new CartManager('./src/db/carts.json');
const router = express.Router();

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json(carts);
});

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

// Ruta para obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
});

// Ruta para añadir un producto a un carrito
router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.addProductToCart(cid, pid);
    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;