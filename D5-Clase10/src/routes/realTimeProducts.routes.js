const express = require('express');
const router = express.Router();
const path = require('path');

const ProductManager = require('../managers/productManager');
const productsFilePath = path.join(__dirname, '../db/products.json');
let pm = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
  try {
    const products = await pm.getProducts();
    res.render('index', { products });
  } catch (error) {
    console.log(error);
  }  
})

module.exports = router;