
/* =====================================
   JUNAR JEWELS - WEBSITE JAVASCRIPT
===================================== */

// YOUR WHATSAPP NUMBER
// Replace with your number, including 91.
// Example: 919876543210

const whatsappNumber = "919180251759";


// 1. WHATSAPP CONTACT BUTTON

const contactButtons = document.querySelectorAll(
    '#contact .btn'
);

contactButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const message = encodeURIComponent(
            "Hello Junar Jewels! I am interested in your jewellery collection. Please share more details."
        );

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappURL, '_blank');
    });
});


// 2. SMOOTH SCROLLING

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function(event) {

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

    });

});


// 3. COLLECTION CARD INTERACTION

const products = document.querySelectorAll('.product');

products.forEach(product => {

    product.style.cursor = 'pointer';

    product.addEventListener('click', function() {

        const productName =
            this.querySelector('h3').textContent;

        const message = encodeURIComponent(
            `Hello Junar Jewels! I would like to know more about ${productName}.`
        );

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappURL, '_blank');

    });

});


// 4. FOOTER AUTOMATIC YEAR

const footerParagraphs = document.querySelectorAll('footer p');

footerParagraphs.forEach(paragraph => {

    if (paragraph.textContent.includes('©')) {

        paragraph.textContent =
            `© ${new Date().getFullYear()} Junar Jewels. All rights reserved.`;

    }

});


// 5. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    '.collections, .about, .contact, .product'
);

revealElements.forEach(element => {

    element.style.opacity = '0';
    element.style.transform = 'translateY(25px)';
    element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// 6. CONSOLE MESSAGE

console.log(
    "JUNAR JEWELS | Luxury Jewellery Website Loaded Successfully."
);
