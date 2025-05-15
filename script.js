// Navigation logic
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('section.page');
const cartCountElem = document.getElementById('cart-count');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsList = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');
const categoryNav = document.querySelector('.category-nav');
const productListElem = document.getElementById('product-list');

let cart = [];
let activeCategory = 'All';

// Product data with categories
const products = [
  // Men Wear
  { id: 1, name: "Men's Casual Shirt", price: 29.99, image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Men's Wear" },
  { id: 2, name: "Men's Jeans", price: 49.99, image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Men's Wear" },

  // Women Wear
  { id: 3, name: "Women's Dress", price: 59.99, image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Women's Wear" },
  { id: 4, name: "Women's Jacket", price: 69.99, image: "https://images.pexels.com/photos/1426711/pexels-photo-1426711.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Women's Wear" },

  // Children Wear
  { id: 5, name: "Children's T-shirt", price: 19.99, image: "https://images.pexels.com/photos/374868/pexels-photo-374868.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Children's Wear" },
  { id: 6, name: "Children's Shorts", price: 24.99, image: "https://images.pexels.com/photos/2916455/pexels-photo-2916455.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Children's Wear" },

  // Shoes - Men
  { id: 7, name: "Men's Sneakers", price: 79.99, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Men's Shoes" },
  { id: 8, name: "Men's Formal Shoes", price: 99.99, image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Men's Shoes" },

  // Shoes - Women
  { id: 9, name: "Women's Heels", price: 89.99, image: "https://images.pexels.com/photos/116453/pexels-photo-116453.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Women's Shoes" },
  { id: 10, name: "Women's Flats", price: 59.99, image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=400", category: "Women's Shoes" },

  // Shoes - Children
  { id: 11, name: "Children's Sneakers", price: 39.99, image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Children's Shoes" },
  { id: 12, name: "Children's Sandals", price: 29.99, image: "https://images.pexels.com/photos/1394889/pexels-photo-1394889.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Children's Shoes" },

  // Kitchen
  { id: 13, name: "Non-stick Pan", price: 34.99, image: "https://images.pexels.com/photos/236043/pexels-photo-236043.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Kitchen" },
  { id: 14, name: "Kitchen Knife Set", price: 49.99, image: "https://images.pexels.com/photos/3709845/pexels-photo-3709845.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Kitchen" },

  // Gym
  { id: 15, name: "Yoga Mat", price: 19.99, image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Gym" },
  { id: 16, name: "Dumbbell Set", price: 59.99, image: "https://images.pexels.com/photos/416779/pexels-photo-416779.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Gym" },

  // Sports
  { id: 17, name: "Football", price: 24.99, image: "https://images.pexels.com/photos/163403/soccer-ball-football-american-football-163403.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Sports" },
  { id: 18, name: "Tennis Racket", price: 89.99, image: "https://images.pexels.com/photos/209972/pexels-photo-209972.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Sports" },

  // Furniture
  { id: 19, name: "Wooden Chair", price: 79.99, image: "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Furniture" },
  { id: 20, name: "Modern Sofa", price: 299.99, image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Furniture" },

  // Grooming
  { id: 21, name: "Electric Shaver", price: 49.99, image: "https://images.pexels.com/photos/694741/pexels-photo-694741.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Grooming" },
  { id: 22, name: "Hair Dryer", price: 59.99, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=400", category: "Grooming" }
];

// Extract unique categories plus 'All'
const categories = ['All', ...new Set(products.map(p => p.category))];

// Render categories navigation buttons
function renderCategories() {
  categoryNav.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    if(cat === activeCategory) btn.classList.add('active');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      updateCategoryButtons();
      renderProducts();
    });
    categoryNav.appendChild(btn);
  });
}

function updateCategoryButtons() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === activeCategory);
  });
}

// Render products filtered by active category
function renderProducts() {
  productListElem.innerHTML = '';
  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  if(filtered.length === 0) {
    productListElem.innerHTML = `<p class="no-products">No products found in "${activeCategory}".</p>`;
    return;
  }

  filtered.forEach(product => {
    const productElem = document.createElement('article');
    productElem.className = 'product';
    productElem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <h2>${product.name}</h2>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productListElem.appendChild(productElem);
  });

  // Add event listeners to Add to Cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id);
    });
  });
}

// Cart functions (unchanged)
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartDisplay();
  alert(`${product.name} added to cart!`);
}

function updateCartDisplay() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElem.textContent = count;

  cartItemsList.innerHTML = '';

  if (count === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    checkoutBtn.disabled = true;
    document.getElementById('cart-total').textContent = '0.00';
    return;
  }

  cart.forEach(({ product, quantity }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${product.name} (x${quantity})</span>
      <span>$${(product.price * quantity).toFixed(2)}</span>
      <button class="remove-item-btn" aria-label="Remove ${product.name} from cart" data-id="${product.id}">&times;</button>
    `;
    cartItemsList.appendChild(li);
  });

  const removeButtons = document.querySelectorAll('.remove-item-btn');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      removeFromCart(id);
    });
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2);

  checkoutBtn.disabled = false;
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartDisplay();
}

openCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('active');
  cartOverlay.setAttribute('aria-hidden', 'false');
});

closeCartBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('active');
  cartOverlay.setAttribute('aria-hidden', 'true');
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  alert(`Thank you for your purchase! Total: $${document.getElementById('cart-total').textContent}`);
  cart = [];
  updateCartDisplay();
  cartOverlay.classList.remove('active');
  cartOverlay.setAttribute('aria-hidden', 'true');
});

// Contact form validation (unchanged)
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.style.color = 'red';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = 'red';
    return;
  }

  formMessage.textContent = 'Thank you for your message!';
  formMessage.style.color = 'green';
  form.reset();
});

// Navigation button logic (unchanged)
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    pages.forEach(page => {
      page.classList.toggle('active', page.id === target);
    });
    navButtons.forEach(b => b.classList.toggle('active', b === btn));
  });
});

// Initialize
renderCategories();
renderProducts();
updateCartDisplay();
