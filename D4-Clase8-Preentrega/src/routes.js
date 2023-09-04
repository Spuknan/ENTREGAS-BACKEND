const express = require('express');
const router = express.Router();
const productsRoutes = require('./routes/products.routes.js');
const cartsRoutes = require('./routes/carts.routes.js');

router.get('/', (req, res) => {
  res.send('Hello API!')
})

// Las rutas parten de /api
router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);

module.exports = router;