const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts()
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }
  

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      throw new Error('Todos los campos son obligatorios.');
    }

    const codeExists = this.products.some((p) => p.code === product.code);

    if (codeExists) {
      throw new Error('Ya existe un producto con el mismo codigo.');
    }

    const newProduct = {
      ...product,
      id: this.products.length + 1,
    };

    this.products.push(newProduct);
    await this.saveProducts();
  }

  async getProducts() {
    try {
      return this.products;
    } catch (error) {
      this.products = [];
      return this.products;
    }
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error('Producto no encontrado');
      return null;
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.error('Producto no encontrado');
      return;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
      id,
    };

    await this.saveProducts();
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.error('Producto no encontrado');
      return;
    }

    console.log("Producto eliminado correctamente");

    this.products.splice(productIndex, 1);
    await this.saveProducts();
  }
}

module.exports = ProductManager;
