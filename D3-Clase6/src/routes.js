const express = require('express');
const router = express.Router();
const productsRoutes = require('./routes/products.routes.js');

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/products', productsRoutes);

module.exports = router;