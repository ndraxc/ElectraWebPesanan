let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update jumlah item di ikon keranjang
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
  }

  // Tambah item ke keranjang (dengan quantity)
  function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  // Hapus item dari keranjang
  function removeFromCart(index) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartList();
    updateTotal();
  }

  // Tampilkan daftar di modal
  function updateCartList() {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
      cartList.innerHTML = '';

      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Bagian Nama Produk
        const productName = document.createElement('span');
        productName.textContent = `${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}`;
        productName.classList.add('product-name');

        // Bagian Tombol
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Tombol Tambah
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.classList.add('btn', 'btn-sm', 'btn-success', 'ms-2');
        addButton.addEventListener('click', () => {
          incrementQuantity(index);
        });

        // Tombol Hapus
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.classList.add('btn', 'btn-sm', 'btn-danger');
        removeButton.addEventListener('click', () => {
          removeFromCart(index);
        });

        // Menambahkan tombol ke dalam container tombol
        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(removeButton);

        // Menyusun elemen dalam list item
        li.appendChild(productName);
        li.appendChild(buttonContainer);
        cartList.appendChild(li);
      });
    }
  }

  // Tambahkan quantity produk
  function incrementQuantity(index) {
    cart[index].quantity += 1;
    updateCartList();
    updateTotal();
  }

  // Menghitung dan menampilkan total harga dengan pemisah ribuan
  function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: Rp ${total.toLocaleString()}`;
  }

  // Kirim ke WhatsApp
  function sendToWhatsApp() {
    if (cart.length === 0) {
      alert('Keranjang List belum terisi');
      return;
    }

    const message = cart
      .map((item, index) => `${index + 1}. ${item.name} - x ${item.quantity}`)
      .join('\n\n');

    const whatsappNumber = '6285792972827'; 
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Order Barang:\n\n' + message)}`;

    window.open(whatsappLink, '_blank');
  }

  // Buka modal
  function showCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      updateCartList();
      updateTotal();
      cartModal.style.display = 'flex';
    }
  }

  // Tutup modal
  function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      cartModal.style.display = 'none';
    }
  }

  // Inisialisasi
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      cartIcon.addEventListener('click', showCartModal);
    }

    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
      closeModal.addEventListener('click', closeCartModal);
    }

    const sendWhatsAppButton = document.getElementById('send-whatsapp');
    if (sendWhatsAppButton) {
      sendWhatsAppButton.addEventListener('click', sendToWhatsApp);
    }

    // Tambah ke keranjang jika tombol klik
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
      });
    });
  });