const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      console.log("Cargando carritos...")
      const data = await fs.readFile(this.path, 'utf8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCarts() {
    console.log("Guardando carritos...")
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
  }

  generateUniqueId() {
    console.log("Generando id unico...")
    if (this.carts.length === 0) {
      return '1';
    } else {
      const maxId = this.carts.reduce((max, cart) => {
        const cartId = parseInt(cart.id);
        return cartId > max ? cartId : max;
      }, 0);
      return (maxId + 1).toString();
    }
  }

  async createCart() {
    const newCart = {
      id: this.generateUniqueId(),
      products: [],
    };

    console.log("Creando carrito...")
    this.carts.push(newCart);
    await this.saveCarts();

    return newCart;
  }

  async getCarts() {
    console.log("Obteniendo todos los carritos...");
    return this.carts;
  }

  async getCartById(cid) {
    console.log(`Obteniendo carrito con id ${cid}...`)
    const cart = this.carts.find((c) => c.id === cid);
    if (!cart) {
      console.error(`Carrito con id ${cid} no encontrado.`);
      return null;
    }
    return cart;
  }

  async addProductToCart(cid, pid) {
    console.log(`Añadiendo producto con id ${pid} al carrito con id ${cid}...`)
    const cart = await this.getCartById(cid);
    if (!cart) {
      console.log(`No se encontro el carrito con id ${cid}.`)
      throw new Error(`No se encontro el carrito con id ${cid}.`);
    }

    console.log(`Verificando la existencia del producto con id ${pid} en el carrito...`)
    const existingProduct = cart.products.find((productItem) => productItem.product === pid);

    if (existingProduct) {
      console.log("El producto ya existe. Añadiendo una unidad...")
      existingProduct.quantity += 1;
    } else {
      console.log("El producto no existe. Añadiendo...")
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.saveCarts();
  }
}

module.exports = CartManager;
