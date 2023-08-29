const express = require('express');
const router = express.Router();
const path = require('path');

const ProductManager = require('../db/fileSystem/productManager');

const productsFilePath = path.join(__dirname, '../products.json');
let pm = new ProductManager(productsFilePath);


// Todas estas rutas parten de /products
// Rutas para el CRUD de productos
router.get('/', async (req, res) => {
  let { limit } = req.query;

  try {
    const products = await pm.getProducts();

    if (!limit) {
      res.json(products);
    } else {
      let limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    }
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

router.get('/:pid', async (req, res) => {
  let pid = parseInt(req.params.pid);

  try {
    const product = await pm.getProductById(pid);
    if (product) {
      res.json(product);
    } else {
      res.send(`No se encontró el producto con id ${pid}`);
    }
  } catch (err) {
    res.send("Error");
  }
});

module.exports = router;
