const express = require('express');
const router = express.Router();
const path = require('path');

const CartManager = require('../managers/cartManager');
const cartsFilePath = path.join(__dirname, '../db/carts.json');
let cm = new CartManager(cartsFilePath);

const ProductManager = require('../managers/productManager');
const productsFilePath = path.join(__dirname, '../db/products.json');
let pm = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
  try {
    const carts = await cm.getCarts();
    console.log("Carritos obtenidos exitosamente.")
    res.status(200).json(carts);
  } catch (err) {
    console.error('Error interno al obtener carritos:', err);
    res.status(500).json({ error: 'Error interno al obtener carritos.' });
  }
});

router.get('/:cid', async (req, res) => {
  const cid = req.params.cid;

  try {
    const cart = await cm.getCartById(cid);
    if (cart) {
      console.log(`Carrito con id ${cid} obtenido exitosamente.`)
      res.status(200).json(cart);
    } else {
      console.error(`No se encontro el carrito con id ${cid}.`)
      res.status(404).json({ error: `No se encontró el carrito con ID ${cid}.` });
    }
  } catch (err) {
    console.error(`Error interno al obtener el carrito con id ${cid}`, err);
    res.status(500).json({ error: `Error interno al obtener el carrito con id ${cid}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = await cm.createCart();
    console.log("Carrito creado exitosamente.")
    res.status(201).json(newCart);
  } catch (err) {
    console.error("Error interno al crear carrito.", err);
    res.status(500).json({ error: "Error interno al crear carrito." });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const productExists = await pm.getProductById(pid);
    if (!productExists) {
      console.error(`Producto con id ${pid} no encontrado.`)
      return res.status(404).json({ error: `Producto con id ${pid} no encontrado.` });
    }
    console.log(`Producto con id ${pid} encontrado.`)

    await cm.addProductToCart(cid, pid);
    console.log(`Producto con ID ${pid} agregado al carrito exitosamente.`)
    res.status(200).json({ message: `Producto con ID ${pid} agregado al carrito exitosamente.` });
  } catch (err) {
    console.error('Error interno al agregar el producto al carrito:', err);
    res.status(500).json({ error: 'Error interno al agregar el producto al carrito.' });
  }
});

module.exports = router;
