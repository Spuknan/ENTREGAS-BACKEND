import Cart from '../models/cart.model.js';

const createCart = async (req, res) => {
  try {
    const newCart = new Cart();
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error('Error al crear un carrito:', error);
    res.status(500).json({ error: 'Error al crear un carrito' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const existingProduct = cart.items.find(item => item.productId.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error('Error al agregar un producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar un producto al carrito' });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    console.error('Error al eliminar un producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar un producto del carrito' });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json({ message: 'Carrito eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar un carrito:', error);
    res.status(500).json({ error: 'Error al eliminar un carrito' });
  }
};

const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error al obtener un carrito:', error);
    res.status(500).json({ error: 'Error al obtener un carrito' });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    console.error('Error al obtener todos los carritos:', error);
    res.status(500).json({ error: 'Error al obtener todos los carritos' });
  }
};

export { createCart, addProductToCart, removeProductFromCart, deleteCart, getCart, getCarts };