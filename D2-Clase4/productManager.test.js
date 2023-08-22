const ProductManager = require('./productManager');
require('colors');

// Crear una instancia de la clase ProductManager
const pm = new ProductManager('./products.json');

//* Test 1 --> getProducts vacio.
function test1() {
  try {
    console.log(" ");
    console.log("// TEST 1 - getProducts debe estar vacío.".cyan.bold);

    const emptyProducts = pm.getProducts();

    emptyProducts.length != 0 ?
      console.error("ERROR --> getProducts no devuelve un arreglo vacío".bgRed) :
      console.log("OK --> getProducts devuelve un arreglo vacio".bgGreen);

  } catch (error) {
    console.error(error);
  }
}

//* Test 2 --> Añadir un producto.
function test2() {
  const newProduct = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };

  try {
    console.log(" ");
    console.log("// TEST 2 - Añadiendo un producto.".cyan.bold);

    pm.addProduct(newProduct);
    const productAdded = pm.getProducts();

    console.log(productAdded);

    productAdded.length != 0 ?
      console.log("OK --> getProducts devuelve el producto.".bgGreen) :
      console.error("ERROR --> getProducts devuelve un arreglo vacío".bgRed);

  } catch (error) {
    console.error(error)
  }
}

//* Test 3 --> Añadir otro producto cuyo id no se repita.
function test3() {
  const secondProduct = {
    title: 'producto prueba 2',
    description: 'Este es un producto prueba 2',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc1234',
    stock: 30,
  };

  try {
    console.log(" ");
    console.log("// TEST 3 - Añadiendo un segundo producto con id unico.".cyan.bold);

    pm.addProduct(secondProduct);
    const products = pm.getProducts();

    console.log(products);

    products[0].id === products[1].id ?
      console.error("ERROR --> El id es identico.".bgRed) :
      console.log("OK --> El id es distinto.".bgGreen);

  } catch (error) {
    console.error(error);
  }
}

//* Test 4 --> Llamar a getProductById.
function test4() {
  try {
    console.log(" ");
    console.log("// TEST 4 - Buscando el producto con id = 1".cyan.bold);

    console.log(pm.getProductById(1))

    pm.getProductById(1) ?
      console.log("OK --> Se obtiene el producto correctamente.".bgGreen) :
      console.error("ERROR --> No se puede obtener el producto con ese id.".bgRed);

  } catch (error) {
    console.error(error);
  }
}

//* Test 5 --> LLamar a updateProduct.
function test5() {
  try {
    console.log(" ");
    console.log("// TEST 5 - Actualizar el producto con id = 2 correctamente.".cyan.bold);

    const oldProduct = pm.getProductById(2);
    console.group("Producto viejo: ")
    console.log(oldProduct)
    console.groupEnd()

    const updatedFields = {
      title: 'Producto actualizado',
      description: "Esta descripcion ha sido modificada",
      price: 666,
    };

    pm.updateProduct(2, updatedFields)
    const updatedProduct = pm.getProductById(2);
    console.group("Producto actualizado: ")
    console.log(updatedProduct)
    console.groupEnd()

    updatedProduct == oldProduct ?
      console.error("ERROR --> El producto no se pudo actualizar.".bgRed) :
      console.log("OK --> Se actualizo el producto correctamente".bgGreen);

  } catch (error) {
    console.error(error);
  }
}

//* Test 6 --> Llamar a deleteProduct con un producto inexistente.
function test6() {
  try {
    console.log(" ");
    console.log("// TEST 6 - Llamar a deleteProduct con un producto inexistente.".cyan.bold);

    const isDeleted = pm.deleteProduct(999);

    if (!isDeleted) {
      console.log("OK --> No se encontró el producto.".bgGreen)
    } else {
      console.error("ERROR --> deleteProduct no dió error.".bgRed)
    }

  } catch (error) {
    console.error(error)
  }
}

//* Test 7 --> Llamar a deleteProduct con un producto existente y borrarlo.
function test7() {
  try {
    console.log(" ");
    console.log("// TEST 7 - Eliminar el producto con id = 2".cyan.bold);

    pm.deleteProduct(2);

    console.log("> Buscando el producto con id = 2")
    
    pm.getProductById(2) ?
      console.error("ERROR --> No se borró el producto.".bgRed) :
      console.log("OK --> El producto se borró exitosamente.".bgGreen)

  } catch (error) {
    console.error(error)
  }
}

//* Reiniciar archivo products.json
function refreshFile() {
  console.log("")
  console.log("Reiniciando archivo products.json...".rainbow);
  pm.deleteProduct(1);
}


test1();
test2();
test3();
test4();
test5();
test6();
test7();
refreshFile();