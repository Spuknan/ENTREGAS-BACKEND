const express = require('express');
const router = express.Router();
const productsRoutes = require('./routes/products.routes.js');
const cartsRoutes = require('./routes/carts.routes.js');
const viewsRoutes = require('./routes/views.routes.js');
const realTimeProductsRoutes = require('./routes/realTimeProducts.routes.js')

router.get('/api', (req, res) => {
  res.send('Hello API!')
})

router.use('/api/products', productsRoutes);
router.use('/api/carts', cartsRoutes);
router.use('/', viewsRoutes);
router.use('/realtimeproducts', realTimeProductsRoutes);

module.exports = router;