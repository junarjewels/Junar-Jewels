

/* ==========================================
   JUNAR JEWELS
   LUXURY MAXIMALIST STOREFRONT
   VERSION 1.0
========================================== */


/* ==========================================
   1. PRODUCT INVENTORY
========================================== */

const products = [

    {
        id: 1,
        name: "The Celeste Earrings",
        category: "Earrings",
        price: 799,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
        description: "An expression of timeless elegance."
    },

    {
        id: 2,
        name: "The Aurelia Bracelet",
        category: "Bracelets",
        price: 999,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85",
        description: "Designed to make every detail count."
    },

    {
        id: 3,
        name: "The Elara Ring",
        category: "Rings",
        price: 599,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
        description: "A little statement of individuality."
    },

    {
        id: 4,
        name: "The Serene Collection",
        category: "Earrings",
        price: 899,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
        description: "A beautiful balance of simplicity and detail."
    }

];


/* ==========================================
   2. CART DATA
========================================== */

let cart = [];


/* ==========================================
   3. DOM ELEMENTS
========================================== */

const productContainer = document.getElementById("products");

const cartSection = document.getElementById("cart");

const cartItemsContainer = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartCount = document.getElementById("count");

const cartButton = document.getElementById("cartButton");

const closeCartButton = document.getElementById("closeCart");

const checkoutButton = document.getElementById("checkoutButton");

const checkoutSection = document.getElementById("checkout");

const orderForm = document.getElementById("orderForm");

const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");


/* ==========================================
   4. FORMAT PRICE
========================================== */

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);

}


/* ==========================================
   5. DISPLAY PRODUCTS
========================================== */

function renderProducts() {

    if (!productContainer) return;

    productContainer.innerHTML = products.map(product => `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">

                <button
                    class="add-product-button"
                    data-product-id="${product.id}">

                    ADD TO BAG +

                </button>

            </div>

            <div class="product-details">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

            </div>

        </article>

    `).join("");

}


/* ==========================================
   6. ADD TO CART
========================================== */

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    showNotification(product.name + " added to your bag.");

}


/* ==========================================
   7. REMOVE FROM CART
========================================== */

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}


/* ==========================================
   8. CHANGE QUANTITY
========================================== */

function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }

    updateCart();

}


/* ==========================================
   9. UPDATE CART
========================================== */

function updateCart() {

    if (!cartItemsContainer) return;

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );


    if (cartCount) {

        cartCount.textContent = totalQuantity;

    }


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <h3>Your bag is waiting.</h3>

                <p>Discover something extraordinary.</p>

            </div>

        `;

    } else {

        cartItemsContainer.innerHTML = cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>${formatPrice(item.price)}</p>

                    <div class="quantity-controls">

                        <button
                            data-cart-action="decrease"
                            data-product-id="${item.id}"
                            aria-label="Decrease quantity">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            data-cart-action="increase"
                            data-product-id="${item.id}"
                            aria-label="Increase quantity">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-item"
                        data-cart-action="remove"
                        data-product-id="${item.id}">

                        REMOVE

                    </button>

                </div>

                <div class="cart-item-subtotal">

                    ${formatPrice(item.price * item.quantity)}

                </div>

            </div>

        `).join("");

    }


    if (cartTotal) {

        cartTotal.textContent = "TOTAL: " + formatPrice(totalPrice);

    }

}


/* ==========================================
   10. OPEN CART
========================================== */

function showCart() {

    if (!cartSection) return;

    cartSection.style.display = "block";

    cartSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ==========================================
   11. CLOSE CART
========================================== */

function closeCart() {

    if (!cartSection) return;

    cartSection.style.display = "none";

}


/* ==========================================
   12. CHECKOUT
========================================== */

function goToCheckout() {

    if (cart.length === 0) {

        showNotification("Your shopping bag is empty.");

        return;

    }

    if (cartSection) {

        cartSection.style.display = "none";

    }

    if (checkoutSection) {

        checkoutSection.style.display = "block";

        checkoutSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* ==========================================
   13. TEST ORDER GENERATOR
========================================== */

function createTestOrder(formData) {

    const orderTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const order = {

        orderId: "JUN-" + Date.now(),

        createdAt: new Date().toISOString(),

        customer: formData,

        products: cart.map(item => ({

            productId: item.id,

            name: item.name,

            price: item.price,

            quantity: item.quantity

        })),

        total: orderTotal,

        paymentMethod: formData.payment,

        status: "TEST ORDER"

    };

    return order;

}


/* ==========================================
   14. ORDER FORM
========================================== */

if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {

            showNotification("Your shopping bag is empty.");

            return;

        }

        if (!orderForm.reportValidity()) return;

        const formData = Object.fromEntries(
            new FormData(orderForm).entries()
        );


        if (formData.payment === "Prepaid") {

            showNotification(
                "Prepaid payment is not connected yet. Please select COD for this test."
            );

            return;

        }


        const order = createTestOrder(formData);


        console.log("JUNAR JEWELS TEST ORDER:", order);


        alert(

            "TEST ORDER CREATED SUCCESSFULLY\n\n" +

            "Order ID: " + order.orderId + "\n" +

            "Total: " + formatPrice(order.total) + "\n\n" +

            "IMPORTANT:\n" +

            "This is a demonstration only.\n" +

            "The order has NOT been sent to JUNAR JEWELS."

        );


        cart = [];

        updateCart();

        orderForm.reset();

        if (checkoutSection) {

            checkoutSection.style.display = "none";

        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ==========================================
   15. MOBILE NAVIGATION
========================================== */

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function() {

        navigation.classList.toggle("active");

        menuToggle.classList.toggle("active");

        const isOpen = navigation.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function() {

            navigation.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* ==========================================
   16. HEADER SCROLL EFFECT
========================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", function() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ==========================================
   17. NOTIFICATION
========================================== */

function showNotification(message) {

    let notification = document.getElementById("junarNotification");

    if (!notification) {

        notification = document.createElement("div");

        notification.id = "junarNotification";

        notification.className = "junar-notification";

        notification.setAttribute("role", "status");

        notification.setAttribute("aria-live", "polite");

        document.body.appendChild(notification);

    }

    notification.textContent = message;

    notification.classList.add("show");

    clearTimeout(showNotification.timeout);

    showNotification.timeout = setTimeout(() => {

        notification.classList.remove("show");

    }, 2800);

}


/* ==========================================
   18. NEWSLETTER
========================================== */

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const emailInput = newsletterForm.querySelector("input");

        if (!emailInput || !emailInput.checkValidity()) {

            emailInput?.reportValidity();

            return;

        }

        const message = document.getElementById("newsletterMessage");

        if (message) {

            message.textContent =
                "Thank you for your interest in JUNAR JEWELS.";

        }

        newsletterForm.reset();

    });

}


/* ==========================================
   19. EVENT DELEGATION
========================================== */

if (productContainer) {

    productContainer.addEventListener("click", function(event) {

        const button = event.target.closest("[data-product-id]");

        if (!button) return;

        const id = Number(button.dataset.productId);

        if (Number.isInteger(id)) {

            addToCart(id);

        }

    });

}


if (cartItemsContainer) {

    cartItemsContainer.addEventListener("click", function(event) {

        const button = event.target.closest("[data-cart-action]");

        if (!button) return;

        const id = Number(button.dataset.productId);

        const action = button.dataset.cartAction;

        if (!Number.isInteger(id)) return;

        if (action === "increase") {

            changeQuantity(id, 1);

        }

        if (action === "decrease") {

            changeQuantity(id, -1);

        }

        if (action === "remove") {

            removeFromCart(id);

        }

    });

}


/* ==========================================
   20. BUTTON CONNECTIONS
========================================== */

if (cartButton) {

    cartButton.addEventListener("click", showCart);

}

if (closeCartButton) {

    closeCartButton.addEventListener("click", closeCart);

}

if (checkoutButton) {

    checkoutButton.addEventListener("click", goToCheckout);

}


/* ==========================================
   21. INITIALIZE JUNAR
========================================== */

function initializeJunar() {

    renderProducts();

    updateCart();

    console.log(
        "JUNAR JEWELS | Storefront initialized successfully."
    );

}

initializeJunar();


/* ==========================================
   END OF JUNAR JEWELS SCRIPT
========================================== */
