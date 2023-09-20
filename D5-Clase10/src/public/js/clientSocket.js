// clientSocket.js
const socket = io();

socket.on('add-product', (product) => {
  console.log('Nuevo producto agregado en tiempo real:', product);
  // Aquí debes agregar lógica para mostrar el producto en la vista
});

socket.on('delete-product', (productId) => {
  console.log('Producto eliminado en tiempo real:', productId);
  // Aquí debes agregar lógica para eliminar el producto de la vista
});
