// Products data (same as in products.js)
const products = [
    // T-Shirts
    { id: 1, name: "Alumni Tee", price: 25.00, image: "tee.jpg", category: "tshirts" },
    { id: 2, name: "Campus Classic Tee", price: 20.00, image: "tee2.jpg", category: "tshirts" },
    { id: 3, name: "Event T-Shirt 2024", price: 22.00, image: "tee3.jpg", category: "tshirts" },
    
    // Hoodies
    { id: 4, name: "Varsity Hoodie", price: 45.00, image: "hoodie.jpg", category: "hoodies" },
    { id: 5, name: "Winter Hoodie", price: 50.00, image: "hoodie2.jpg", category: "hoodies" },
    { id: 6, name: "Classic Blue Hoodie", price: 48.00, image: "hoodie3.jpg", category: "hoodies" },
    
    // Caps
    { id: 7, name: "Campus Cap", price: 15.00, image: "cap.jpg", category: "caps" },
    { id: 8, name: "Sport Cap", price: 18.00, image: "cap2.jpg", category: "caps" },
    { id: 9, name: "Classic Baseball Cap", price: 16.00, image: "cap3.jpg", category: "caps" },
    
    // Wrist Bands
    { id: 10, name: "University Wrist Band", price: 8.00, image: "wristband.jpg", category: "wristbands" },
    { id: 11, name: "Colored Wrist Band Pack", price: 12.00, image: "wristband2.jpg", category: "wristbands" },
    { id: 12, name: "Premium Wrist Band", price: 10.00, image: "wristband3.jpg", category: "wristbands" }
];

// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = '<h1>Product not found</h1>';
        return;
    }

    // Update product image
    const productImg = document.getElementById('productImg');
    if (productImg) {
        productImg.src = `assets/${product.image}`;
        productImg.alt = product.name;
    }

    // Update product name
    const productName = document.getElementById('productName');
    if (productName) {
        productName.textContent = product.name;
    }

    // Update product category
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        const categoryText = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        productCategory.textContent = `Category: ${categoryText}`;
    }

    // Update product price
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.textContent = `Rs. ${product.price}`;
    }

    // Add to cart button functionality
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            addToCart(productId);
        });
    }
}

// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
        updateCartCount();
    }
}

// Update cart count (for navbar)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.querySelector('.cart');
    if (cartElement) {
        cartElement.setAttribute('data-count', cart.length);
    }
}

// Handle size selection
function handleSizeSelection() {
    const sizeButtons = document.querySelectorAll('.sizes button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Initialize
window.onload = () => {
    loadProductDetails();
    handleSizeSelection();
    updateCartCount();
};
