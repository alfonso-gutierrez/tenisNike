document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-product-form');
    const tableBody = document.getElementById('product-list');
    let products = [];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const brand = document.getElementById('brand').value;
      const price = document.getElementById('price').value;
  
      if (name.trim() !== '' && brand.trim() !== '' && price.trim() !== '') {
        const id = generateId();
        const product = { id, name, brand, price };
        products.push(product);
        renderProducts();
        form.reset();
      }
    });
  
    function generateId() {
      return Math.random().toString(36).substr(2, 9); // Generar un ID único
    }
  
    function renderProducts() {
      tableBody.innerHTML = '';
      products.forEach(function(product) {
        const row = `
          <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>$${product.price}</td>
            <td>
              <button onclick="editProduct('${product.id}')">Editar</button>
              <button onclick="deleteProduct('${product.id}')">Eliminar</button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    }
  
    function editProduct(id) {
      const product = products.find(function(product) {
        return product.id === id;
      });
  
      if (product) {
        const nameInput = document.getElementById('name');
        const brandInput = document.getElementById('brand');
        const priceInput = document.getElementById('price');
  
        nameInput.value = product.name;
        brandInput.value = product.brand;
        priceInput.value = product.price;
  
        form.removeEventListener('submit', handleSubmit);
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          product.name = nameInput.value;
          product.brand = brandInput.value;
          product.price = priceInput.value;
          renderProducts();
          form.reset();
          form.removeEventListener('submit', handleSubmit);
          form.addEventListener('submit', handleSubmit);
        });
      }
    }
  
    function deleteProduct(id) {
      products = products.filter(function(product) {
        return product.id !== id;
      });
      renderProducts();
    }
  
    renderProducts();
  });
  