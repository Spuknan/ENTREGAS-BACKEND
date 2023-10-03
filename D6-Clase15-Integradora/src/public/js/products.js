const socket = io();

// Función para renderizar la lista de productos
const renderProducts = (products) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.innerHTML = `
      <p><strong>${product.title}</strong></p>
      <p>${product.description}</p>
      <p>Categoría: ${product.category}</p>
      <p>Precio: ${product.price}</p>
      <p>Código: ${product.code}</p>
      <p>Stock: ${product.stock}</p>
      <hr>
    `;
    productList.appendChild(productItem);
  });
};

// Obtener la lista de productos al cargar la página
socket.emit('getProducts');

// Manejar eventos de sockets
socket.on('productList', products => {
  renderProducts(products);
});

// Manejar el envío del formulario para agregar productos
const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value.split(',');
  const code = document.getElementById('code').value;
  const stock = document.getElementById('stock').value;

  // Enviar el nuevo producto al servidor
  socket.emit('addProduct', { title, description, category, price, thumbnail, code, stock });

  // Limpiar el formulario
  addProductForm.reset();
});