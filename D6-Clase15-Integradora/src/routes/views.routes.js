import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/chat', (req, res) => {
  res.render('chat');
});

router.get('/products', (req, res) => {
  res.render('products');
});

export default router;