// Products data with categories
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

let filteredProducts = [...products];

// Display products
function displayProducts(productsToShow = products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    if (productsToShow.length === 0) {
        grid.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="assets/${product.image}" alt="${product.name}" width="100%">
            <h3>${product.name}</h3>
            <p class="price">Rs. ${product.price}</p>
            <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Filter products by category
function filterProducts() {
    const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);

    if (selectedCategories.includes('all')) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => selectedCategories.includes(product.category));
    }

    displayProducts(filteredProducts);
}

// Event listeners for filters
function setupFilterListeners() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // If "All" is checked, uncheck all others
            if (checkbox.value === 'all' && checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb.value !== 'all') cb.checked = false;
                });
            } else if (checkbox.value !== 'all') {
                // If any category is checked, uncheck "All"
                const allCheckbox = document.querySelector('.filter-checkbox[value="all"]');
                if (allCheckbox) allCheckbox.checked = false;
            }
            
            filterProducts();
        });
    });

    // Clear filters button
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            checkboxes.forEach(cb => cb.checked = cb.value === 'all');
            filterProducts();
        });
    }
}

// Add to cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = products.find(p => p.id === id);
    if (item) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.name} added to cart!`);
        updateCartCount();
    }
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.querySelector('.cart');
    if (cartElement) {
        cartElement.setAttribute('data-count', cart.length);
    }
}

// Initialize
window.onload = () => {
    displayProducts();
    setupFilterListeners();
    updateCartCount();
};

// Navigate to product details page
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}