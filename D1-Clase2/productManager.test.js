const ProductManager = require('./productManager');
require('colors');

// Crear una instancia de la clase ProductManager
const productManager = new ProductManager();

// Prueba: getProducts en una instancia recién creada
const emptyProducts = productManager.getProducts();
if (emptyProducts.length !== 0) {
  console.error('Error en prueba 1: getProducts no devuelve un arreglo vacío.'.bgRed);
} else {
  console.log('Prueba 1 exitosa: getProducts devuelve un arreglo vacío.'.bgGreen);
}

// Agregar un producto
const newProduct = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};

try {
  productManager.addProduct(newProduct);
  const productsAfterAdd = productManager.getProducts();
  if (productsAfterAdd.length !== 1) {
    console.error('Error en prueba 2: El producto no se agregó correctamente.'.bgRed);
  } else if (productsAfterAdd[0].id !== 1) {
    console.error('Error en prueba 2: El ID del producto no es el esperado.'.bgRed);
  } else {
    console.log('Prueba 2 exitosa: El producto se agregó correctamente.'.bgGreen);
  }
} catch (error) {
  console.error(`Error en prueba 2: Se arrojó un error inesperado: ${error.message}`.bgRed);
}

// Intentar agregar un producto con el mismo código
try {
  productManager.addProduct(newProduct);
  console.error('Error en prueba 3: No se arrojó un error al agregar producto con código repetido.'.bgRed);
} catch (error) {
  if (error.message === 'Ya existe un producto con el mismo codigo.') {
    console.log('Prueba 3 exitosa: Se arrojó un error al agregar producto con código repetido.'.bgGreen);
  } else {
    console.error(`Error en prueba 3: Se arrojó un error inesperado: ${error.message}`.bgRed);
  }
}

// Obtener un producto por ID
const foundProduct = productManager.getProductById(1);
if (foundProduct === null || foundProduct.code !== 'abc123') {
  console.error('Error en prueba 4: No se pudo obtener el producto por ID.'.bgRed);
} else {
  console.log('Prueba 4 exitosa: Se obtuvo el producto por ID correctamente.'.bgGreen);
}

// Intentar obtener un producto con ID inexistente
const nonExistentProduct = productManager.getProductById(2);
if (nonExistentProduct !== null) {
  console.error('Error en prueba 5: Se obtuvo un producto inexistente por ID.'.bgRed);
} else {
  console.log('Prueba 5 exitosa: No se pudo obtener el producto con ese ID.'.bgGreen);
}
