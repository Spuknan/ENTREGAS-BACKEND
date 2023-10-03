import Product from '../models/product.model.js';

const getProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await Product.find().limit(parseInt(limit) || 10);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error al añadir producto:', error);
    res.status(500).json({ error: 'Error al añadir producto' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto por ID:', error);
    res.status(500).json({ error: 'Error al actualizar producto por ID' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto por ID:', error);
    res.status(500).json({ error: 'Error al eliminar producto por ID' });
  }
};

export { getProducts, addProduct, getProductById, updateProductById, deleteProductById };