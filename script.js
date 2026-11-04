
"use strict";

/* =====================================
   JUNAR JEWELS — STOREFRONT
   Demo version: no live payments or orders
===================================== */


/* =====================================
   1. SAMPLE PRODUCT DATA
===================================== */

const products = [
  {
    id: 1,
    name: "Signature Silver Ring",
    category: "Rings",
    price: 799,
    image: "assets/product-ring-1.jpg",
    description: "A minimal silver ring for everyday elegance."
  },
  {
    id: 2,
    name: "Classic Silver Earrings",
    category: "Earrings",
    price: 999,
    image: "assets/product-earrings-1.jpg",
    description: "Simple silver earrings with a timeless finish."
  },
  {
    id: 3,
    name: "Essential Silver Bracelet",
    category: "Bracelets",
    price: 899,
    image: "assets/product-bracelet-1.jpg",
    description: "A refined bracelet designed for everyday wear."
  },
  {
    id: 4,
    name: "Minimal Silver Ring",
    category: "Rings",
    price: 699,
    image: "assets/product-ring-2.jpg",
    description: "An understated piece for a clean, modern look."
  }
];


/* =====================================
   2. ELEMENT REFERENCES
===================================== */

const productGrid = document.getElementById("product-grid");

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const cartToggle = document.getElementById("cart-toggle");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

const toast = document.getElementById("toast");


/* =====================================
   3. APPLICATION STATE
===================================== */

let cart = [];

try {
  const savedCart = JSON.parse(
    localStorage.getItem("junar-cart") || "[]"
  );

  if (Array.isArray(savedCart)) {
    cart = savedCart.filter(item => {
      return (
        Number.isInteger(item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        products.some(product => product.id === item.id)
      );
    });
  }
} catch (error) {
  console.warn("Could not load saved cart:", error);
  cart = [];
}


/* =====================================
   4. HELPER FUNCTIONS
===================================== */

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}


function saveCart() {
  try {
    localStorage.setItem("junar-cart", JSON.stringify(cart));
  } catch (error) {
    console.warn("Could not save cart:", error);
  }
}


let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =====================================
   5. PRODUCT DISPLAY
===================================== */

function renderProducts(productList = products) {
  if (!productGrid) return;

  if (productList.length === 0) {
    productGrid.innerHTML = `
      <p class="no-products">
        No products found. Try another search.
      </p>
    `;
    return;
  }

  productGrid.innerHTML = productList.map(product => `
    <article class="product-card">

      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>

      <div class="product-info">

        <p class="product-category">
          ${product.category}
        </p>

        <h3>${product.name}</h3>

        <p class="product-price">
          ${formatPrice(product.price)}
        </p>

        <button
          class="add-to-cart"
          type="button"
          data-product-id="${product.id}"
        >
          ADD TO BAG
        </button>

      </div>

    </article>
  `).join("");
}


/* =====================================
   6. ADD PRODUCTS TO CART
===================================== */

function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  showToast(`${product.name} added to your bag.`);
}


if (productGrid) {
  productGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-to-cart");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    if (Number.isInteger(productId)) {
      addToCart(productId);
    }
  });
}


/* =====================================
   7. CART DISPLAY
===================================== */

function renderCart() {
  if (!cartItems || !cartCount || !cartTotal) return;

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);

    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(subtotal);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Your bag is currently empty.
      </p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    return `
      <div class="cart-item">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="cart-item-details">

          <h3>${product.name}</h3>

          <p>${formatPrice(product.price)}</p>

          <div class="quantity-controls">

            <button
              type="button"
              data-action="decrease"
              data-id="${product.id}"
              aria-label="Decrease quantity"
            >−</button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-action="increase"
              data-id="${product.id}"
              aria-label="Increase quantity"
            >+</button>

          </div>

        </div>

        <button
          class="remove-item"
          type="button"
          data-action="remove"
          data-id="${product.id}"
          aria-label="Remove ${product.name}"
        >
          ×
        </button>

      </div>
    `;
  }).join("");
}


/* =====================================
   8. CART QUANTITY AND REMOVAL
===================================== */

if (cartItems) {
  cartItems.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
      }
    }

    if (action === "remove") {
      cart = cart.filter(item => item.id !== productId);
    }

    saveCart();
    renderCart();
  });
}


/* =====================================
   9. OPEN AND CLOSE CART
===================================== */

function openCart() {
  if (!cartOverlay) return;

  cartOverlay.hidden = false;
  document.body.classList.add("cart-open");

  if (cartClose) {
    cartClose.focus();
  }
}


function closeCart() {
  if (!cartOverlay) return;

  cartOverlay.hidden = true;
  document.body.classList.remove("cart-open");

  if (cartToggle) {
    cartToggle.focus();
  }
}


if (cartToggle) {
  cartToggle.addEventListener("click", openCart);
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
      closeCart();
    }
  });
}


/* =====================================
   10. MOBILE NAVIGATION
===================================== */

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =====================================
   11. SEARCH
===================================== */

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    searchPanel.hidden = !searchPanel.hidden;

    if (!searchPanel.hidden && searchInput) {
      searchInput.focus();
    }
  });
}


if (searchForm && searchInput) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderProducts();
      return;
    }

    const results = products.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });

    renderProducts(results);

    if (searchPanel) {
      searchPanel.hidden = true;
    }

    document.getElementById("bestsellers")?.scrollIntoView({
      behavior: "smooth"
    });
  });
}


/* =====================================
   12. NEWSLETTER DEMO
===================================== */

if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!newsletterForm.reportValidity()) return;

    if (newsletterMessage) {
      newsletterMessage.textContent =
        "Newsletter registration is not connected yet.";
    }

    newsletterForm.reset();
  });
}


/* =====================================
   13. CHECKOUT DEMO
===================================== */

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your bag is empty.");
      return;
    }

    showToast("Online checkout is not connected yet.");
  });
}


/* =====================================
   14. KEYBOARD ACCESSIBILITY
===================================== */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (cartOverlay && !cartOverlay.hidden) {
      closeCart();
    }

    if (searchPanel && !searchPanel.hidden) {
      searchPanel.hidden = true;
    }

    if (mobileNav && mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active");

      if (menuToggle) {
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  }
});


/* =====================================
   15. FOOTER YEAR
===================================== */

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =====================================
   16. INITIALIZE WEBSITE
===================================== */

renderProducts();
renderCart();

console.log("JUNAR JEWELS storefront initialized.");
