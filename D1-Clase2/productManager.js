class ProductManager {
  constructor() {
    this.products = [];
    this.lastProductId = 0;
  }

  addProduct(product) {
    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const codeExists = this.products.some((p) => p.code === product.code)
    
    if (codeExists){
      throw new Error("Ya existe un producto con el mismo codigo.")
    }

    this.lastProductId++
    const newProduct = { ...product, id: this.lastProductId }
    this.products.push(newProduct)
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id)
    if (!product) {
      console.error("Producto no encontrado")
      return null
    }
    return product
  }
}

module.exports = ProductManager;