// Shopping cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const ctaButton = document.querySelector('.cta-button');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProductGallery();
    initializeCart();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeHeroSlider();
    initializeScrollToTop();
    initializeLogoClick();
    initializeFooterArrow();
    
    // Add direct click handlers as backup
    setTimeout(() => {
        const footerArrow = document.getElementById('footer-home-arrow');
        const logo = document.getElementById('logo-home');
        const scrollBtn = document.getElementById('scroll-to-top');
        
        if (footerArrow) {
            console.log('Footer arrow found, adding click handler');
            footerArrow.onclick = function(e) {
                e.preventDefault();
                console.log('Footer arrow clicked!');
                window.scrollTo(0, 0);
                return false;
            };
            footerArrow.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Footer arrow event listener triggered!');
                window.scrollTo(0, 0);
                return false;
            });
        } else {
            console.log('Footer arrow NOT found');
        }
        
        if (logo) {
            console.log('Logo found, adding click handler');
            logo.onclick = function(e) {
                e.preventDefault();
                console.log('Logo clicked!');
                window.scrollTo(0, 0);
                return false;
            };
        } else {
            console.log('Logo NOT found');
        }
        
        if (scrollBtn) {
            console.log('Scroll button found, adding click handler');
            scrollBtn.onclick = function(e) {
                e.preventDefault();
                console.log('Scroll button clicked!');
                window.scrollTo(0, 0);
                return false;
            };
        } else {
            console.log('Scroll button NOT found');
        }
    }, 500);
});

// Hero Image Slider
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 4 seconds
    setInterval(showNextSlide, 4000);
}

function initializeProductGallery() {
    // Product switching functionality
    function showProduct(index) {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }
}

function initializeCart() {
    // Initialize event listeners
    function initializeEventListeners() {
        // Add to cart buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const product = this.getAttribute('data-product');
                const price = parseFloat(this.getAttribute('data-price'));
                addToCart(product, price);
            });
        });

        // Cart icon click
        cartIcon.addEventListener('click', function() {
            cartModal.style.display = 'block';
            displayCartItems();
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        // CTA button scroll to products
        ctaButton.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-menu a, .footer-section a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Contact form submission
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });

        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', function() {
            handleCheckout();
        });

        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    initializeEventListeners();
}

function initializeMobileMenu() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(product, price);
        });
    });

    // Cart icon click
    cartIcon.addEventListener('click', function() {
        cartModal.style.display = 'block';
        displayCartItems();
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // CTA button scroll to products
    ctaButton.addEventListener('click', function() {
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-section a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm();
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        handleCheckout();
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

function addToCart(product, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.product === product);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product: product,
            price: price,
            quantity: 1
        });
    }
    
    cartCount++;
    cartTotal += price;
    updateCartDisplay();
    showAddToCartAnimation();
}

function removeFromCart(product) {
    const itemIndex = cart.findIndex(item => item.product === product);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cartTotal -= (item.price * item.quantity);
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        displayCartItems();
    }
}

function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.product}</strong><br>
                <span style="color: #666;">$${item.price.toFixed(2)} x ${item.quantity}</span>
            </div>
            <div>
                <span style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart('${item.product}')" style="margin-left: 10px; background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Product switching functionality
function showProduct(index) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

function showAddToCartAnimation() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'Added to cart!';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function handleContactForm() {
    const form = document.querySelector('.contact-form');
    const formData = new FormData(form);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
    successMessage.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
    `;
    
    form.appendChild(successMessage);
    form.reset();
    
    setTimeout(() => {
        form.removeChild(successMessage);
    }, 5000);
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Simulate checkout process
    const confirmation = confirm(`Proceed to checkout?\nTotal: $${cartTotal.toFixed(2)}`);
    
    if (confirmation) {
        // Clear cart
        cart = [];
        cartCount = 0;
        cartTotal = 0;
        updateCartDisplay();
        cartModal.style.display = 'none';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Order placed successfully! Thank you for your purchase.';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4CAF50;
            color: white;
            padding: 2rem;
            border-radius: 15px;
            z-index: 3000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 3000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        animation: fadeIn 0.6s ease forwards;
    }
    
    .product-card:nth-child(1) { animation-delay: 0.1s; }
    .product-card:nth-child(2) { animation-delay: 0.2s; }
    .product-card:nth-child(3) { animation-delay: 0.3s; }
    .product-card:nth-child(4) { animation-delay: 0.4s; }
    .product-card:nth-child(5) { animation-delay: 0.5s; }
    .product-card:nth-child(6) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    });
}

// Logo Click to Home
function initializeLogoClick() {
    const logo = document.getElementById('logo-home');
    
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        });
    }
}

// Footer Arrow to Home
function initializeFooterArrow() {
    const footerArrow = document.getElementById('footer-home-arrow');
    
    if (footerArrow) {
        footerArrow.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        });
    }
}
