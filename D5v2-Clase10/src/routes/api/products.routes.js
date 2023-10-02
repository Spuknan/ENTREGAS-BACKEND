import express from 'express';
import ProductManager from '../../controllers/products.controller.js';
import { socketServer } from '../../app.js';


const pm = new ProductManager('./src/db/products.json');
const router = express.Router();

// Ruta para obtener todos los productos
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

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  const product = req.body;
  try {
    await pm.addProduct(product);
    socketServer.emit('productAdded', product);
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un producto por ID
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await pm.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Ruta para actualizar un producto por ID
router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  try {
    await pm.updateProduct(pid, updatedFields);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    await pm.deleteProduct(pid);
    socketServer.emit('productDeleted', pid);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;