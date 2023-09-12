const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      console.log("Cargando productos...")
      const data = await fs.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    console.log("Guardando productos...")
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  generateUniqueId() {
    console.log("Generando id unico...")
    if (this.products.length === 0) {
      return '1';
    } else {
      const maxId = this.products.reduce((max, product) => {
        const productId = parseInt(product.id);
        return productId > max ? productId : max;
      }, 0);
      return (maxId + 1).toString();
    }
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.category ||
      !product.price ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios")
      throw new Error("Todos los campos son obligatorios.");
    }

    const codeExists = this.products.some((p) => p.code === product.code);

    if (codeExists) {
      console.log("Ya existe un producto con el mismo codigo.")
      throw new Error("Ya existe un producto con el mismo codigo.");
    }
    console.log("Codigo validado.")

    const newProduct = {
      ...product,
      id: this.generateUniqueId(),
    };

    console.log("Guardando producto...")
    this.products.push(newProduct);
    await this.saveProducts();
  }

  async getProducts(limit) {
    try {
      console.log(`Buscando productos... Limite: ${limit}.`)
      return limit ? this.products.slice(0, limit) : this.products;
    } catch (error) {
      this.products = [];
      return this.products;
    }
  }

  async getProductById(pid) {
    console.log(`Buscando producto con id ${pid}...`)
    const product = this.products.find((p) => p.id === pid);
    if (!product) {
      console.error(`No se encontró el producto con id ${pid}.`)
      return null;
    }
    return product;
  }

  async updateProduct(pid, updatedFields) {
    console.log(`Buscando producto con id ${pid} para actualizar...`)
    const productIndex = this.products.findIndex((p) => p.id === pid);
    if (productIndex === -1) {
      console.error(`Producto con id ${pid} no encontrado.`);
      return;
    }

    console.log(`Actualizando producto con id ${pid}...`)
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
    };

    await this.saveProducts();
  }

  async deleteProduct(pid) {
    console.log(`Buscando producto con id ${pid} para eliminar...`)
    const productIndex = this.products.findIndex((p) => p.id === pid);
    if (productIndex === -1) {
      console.error(`Producto con id ${pid} no encontrado.`);
      return;
    }

    console.log(`Eliminando producto con id ${pid}...`)
    this.products.splice(productIndex, 1);
    await this.saveProducts();
  }
}

module.exports = ProductManager;
