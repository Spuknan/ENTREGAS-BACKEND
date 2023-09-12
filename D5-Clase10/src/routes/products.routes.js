const express = require('express');
const router = express.Router();
const path = require('path');

const ProductManager = require('../managers/productManager');

const productsFilePath = path.join(__dirname, '../db/products.json');
let pm = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;

  try {
    const products = await pm.getProducts(limit);
    if (products.length === 0) {
      console.error("No hay productos disponibles.")
      res.status(404).json({ error: "No hay productos disponibles." });
    } else {
      console.log("Productos obtenidos con exito.")
      res.status(200).json(products);
    }
  } catch (err) {
    console.error("Error interno al obtener productos:", err);
    res.status(500).json({ error: "Error interno al obtener productos." });
  }
});

router.get('/:pid', async (req, res) => {
  let pid = req.params.pid;

  try {
    const product = await pm.getProductById(pid);
    if (product) {
      console.log(`Producto con id ${pid} encontrado.`);
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: `No se encontró el producto con id ${pid}.` });
    }
  } catch (err) {
    console.error("Error interno al obtener el producto:", err);
    res.status(500).json({ error: "Error interno al obtener el producto." });
  }
});

router.post('/', async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    console.error("Todos los campos son oblgiatorios.")
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    const newProduct = {
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail: thumbnail || [],
    };

    await pm.addProduct(newProduct);
    console.log("Producto creado con exito.")
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error interno al agregar el producto:', err);
    res.status(500).json({ error: 'Error interno al agregar el producto.' });
  }
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const updatedFields = req.body;

  try {
    const existingProduct = await pm.getProductById(pid);
    if (!existingProduct) {
      console.error(`No se encontro el producto con id ${pid}.`)
      return res.status(404).json({ error: `No se encontró el producto con id ${pid}.` });
    }

    await pm.updateProduct(pid, updatedFields);

    console.log(`Producto con id ${pid} actualizado con exito.`)
    res.status(200).json({ message: 'Producto actualizado con éxito.' });
  } catch (err) {
    console.error('Error interno al actualizar el producto:', err);
    res.status(500).json({ error: 'Error interno al actualizar el producto.' });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;

  try {
    const existingProduct = await pm.getProductById(pid);
    if (!existingProduct) {
      console.error(`No se encontro el producto con id ${pid}.`)
      return res.status(404).json({ error: `No se encontro el producto con ID ${pid}.` });
    }

    await pm.deleteProduct(pid);

    console.log(`Producto con id ${pid} eliminado con exito.`)
    res.status(200).json({ message: `Producto con id ${pid} eliminado con exito.` });
  } catch (err) {
    console.error(`Error interno al eliminar el producto con id ${pid}.`, err);
    res.status(500).json({ error: `Error interno al eliminar el producto con id ${pid}.` });
  }
});

module.exports = router;
