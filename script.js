
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen ? "✕" : "☰";

        });

        // Close menu after clicking a navigation link

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.innerHTML = "☰";

            });

        });

    }


    // =====================================
    // 2. SMOOTH SCROLLING
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // 3. HEADER SCROLL EFFECT
    // =====================================

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    // =====================================
    // 4. SEARCH FUNCTION
    // =====================================

    const searchButton = document.querySelector(".search-button");

    if (searchButton) {

        searchButton.addEventListener("click", () => {

            const searchTerm = prompt(
                "What jewellery are you looking for?"
            );

            if (!searchTerm || !searchTerm.trim()) return;

            const term = searchTerm.toLowerCase().trim();

            const products = document.querySelectorAll(".product-card");

            let found = false;

            products.forEach(product => {

                const productName = product.innerText.toLowerCase();

                if (productName.includes(term)) {

                    if (!found) {

                        product.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        found = true;

                    }

                    product.classList.add("search-highlight");

                } else {

                    product.classList.remove("search-highlight");

                }

            });

            if (!found) {

                alert("No matching jewellery found. Please try another search.");

            }

        });

    }


    // =====================================
    // 5. WHATSAPP CONTACT
    // =====================================

    // Replace this with your official business WhatsApp number.
    // Include country code, without + or spaces.

    const WHATSAPP_NUMBER = "91XXXXXXXXXX";

    const whatsappLinks = document.querySelectorAll(".whatsapp-link");

    whatsappLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            if (WHATSAPP_NUMBER.includes("X")) {

                alert("WhatsApp number will be activated soon.");

                return;

            }

            const message = encodeURIComponent(
                "Hello JUNAR JEWELS! I am interested in your 925 silver jewellery collection."
            );

            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

            window.open(whatsappURL, "_blank", "noopener,noreferrer");

        });

    });


    // =====================================
    // 6. PRODUCT IMAGE LOADING
    // =====================================

    const productImages = document.querySelectorAll(
        ".product-card img, .collection-card img"
    );

    productImages.forEach(img => {

        img.addEventListener("error", () => {

            img.classList.add("image-missing");

            img.alt = "Product image coming soon";

        });

    });


    // =====================================
    // 7. FOOTER YEAR
    // =====================================

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // =====================================
    // 8. REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".collection-card, .product-card, .section-heading, .brand-intro, .about-section"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    // =====================================
    // 9. IMAGE SEARCH HIGHLIGHT RESET
    // =====================================

    document.addEventListener("click", event => {

        if (!event.target.closest(".search-button")) {

            // Keep the product highlight until another search.
            // No action required here.

        }

    });


    // =====================================
    // WEBSITE INITIALIZED
    // =====================================

    console.log("JUNAR JEWELS website initialized.");

});
