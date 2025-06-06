document.addEventListener('DOMContentLoaded', function() {
  // Simulate loading
  setTimeout(() => {
    document.querySelector('.loading-overlay').classList.add('hidden');
  }, 1000);

  // Products data
  const products = [
  { 
    id: 1, 
    name: 'Classic White Shirt', 
    price: 29.99, 
    img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  },
  { 
    id: 2, 
    name: 'Slim Fit Jeans', 
    price: 59.99, 
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  },
  { 
    id: 3, 
    name: 'Leather Jacket', 
    price: 199.99, 
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  },
  { 
    id: 4, 
    name: 'Casual Shirts', 
    price: 79.99, 
    img: 'https://www.fhsjgoods.com/cdn/shop/products/6da0f4ac99e83b03d3c14007ef4c0f63.jpg?v=1653577568&width=1500' 
  },
  { 
    id: 5, 
    name: 'Wool Overcoat', 
    price: 149.99, 
    img: 'https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common_22fw/img/item_14_01.jpg?220211' 
  },
  { 
    id: 6, 
    name: 'Cotton T-Shirt', 
    price: 19.99, 
    img: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  },
  { 
    id: 7, 
    name: 'Denim Jacket', 
    price: 89.99, 
    img: 'https://cdna.lystit.com/photos/scottsmenswear/20102437/levis--Sherpa-Lightweight-Denim-Jacket.jpeg' 
  },
  { 
    id: 8, 
    name: 'Sneakers', 
    price: 129.99, 
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  },
  { 
    id: 9, 
    name: 'Summer Shorts', 
    price: 34.99, 
    img: 'https://www.werd.com/wp-content/uploads/2023/04/best-shorts.jpg' 
  },
  { 
    id: 10, 
    name: 'Formal Shoes', 
    price: 24.99, 
    img: 'https://th.bing.com/th/id/OIP.qB0pOPTakSQZwMt7qLBbWwHaHa?r=0&rs=1&pid=ImgDetMain' 
  },
  { 
    id: 11, 
    name: 'Sports Watch', 
    price: 89.99, 
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  },
  { 
    id: 12, 
    name: 'Designer Sunglasses', 
    price: 129.99, 
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
  }
];

  // Cart functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // DOM elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-icon');
  const mainNav = document.querySelector('.main-nav');
  const cartLink = document.getElementById('cart-link');
  const cartPreview = document.getElementById('cart-preview');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const productGrid = document.getElementById('product-grid');
  const shopNowBtn = document.getElementById('shop-now-btn');

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });

  // Toggle cart preview
  cartLink.addEventListener('click', function(e) {
    e.preventDefault();
    cartPreview.classList.toggle('active');
  });

  // Close cart preview
  closeCartBtn.addEventListener('click', function() {
    cartPreview.classList.remove('active');
  });

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (!cartPreview.contains(e.target) && e.target !== cartLink) {
      cartPreview.classList.remove('active');
    }
  });

  // Update cart count
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
  }

  // Add to cart
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    
    // Show cart preview when adding an item
    cartPreview.classList.add('active');
    
    // Add animation to cart icon
    cartLink.classList.add('animate');
    setTimeout(() => {
      cartLink.classList.remove('animate');
    }, 500);
  }

  // Update item quantity
  function updateItemQuantity(productId, action) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
      if (action === 'increase') {
        cart[itemIndex].quantity++;
      } else if (action === 'decrease') {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity <= 0) {
          cart.splice(itemIndex, 1);
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    }
  }

  // Remove item from cart
  function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  // Render cart items
  function renderCartItems() {
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
      cartTotal.innerHTML = '<strong>Total: $0.00</strong>';
      return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
          <span class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></span>
        </div>
      `;
      cartItemsList.appendChild(li);
      
      total += item.price * item.quantity;
    });
    
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        const action = this.dataset.action;
        updateItemQuantity(productId, action);
      });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        removeItem(productId);
      });
    });
  }

  // Checkout
  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    cartPreview.classList.remove('active');
  });

  // Display products
 function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.img}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      
      productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        const product = products.find(p => p.id === productId);
        addToCart(product);
      });
    });
  }

  // Shop now button
  shopNowBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });

  // Initialize
  updateCartCount();
  renderCartItems();
  displayProducts();
});