let products = [];
let filteredProducts = [];


function loadProductsFromAPI(callback) {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (!res.ok) throw new Error("Failed to fetch products");
            return res.json();
        })
        .then(function(data) {
            products = data;
            filteredProducts = [...products];
            if (callback) callback();
        })
        .catch(function(err) {
            console.error("Error loading products:", err);
        });
}




function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}


function loadProductDetails() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = '<h1>Product not found</h1>';
        return;
    }

    
    const productImg = document.getElementById('productImg');
    if (productImg) {
        productImg.src = `assets/${product.image}`;
        productImg.alt = product.name;
    }

    
    const productName = document.getElementById('productName');
    if (productName) {
        productName.textContent = product.name;
    }

    
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        const categoryText = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        productCategory.textContent = `Category: ${categoryText}`;
    }

    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.textContent = `Rs. ${product.price}`;
    }

    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            addToCart(productId);
        });
    }
}

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

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.querySelector('.cart');
    if (cartElement) {
        cartElement.setAttribute('data-count', cart.length);
    }
}

function handleSizeSelection() {
    const sizeButtons = document.querySelectorAll('.sizes button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}



window.onload = function() {
    loadProductsFromAPI(function() {
        loadProductDetails(); 
        handleSizeSelection();
        updateCartCount();
    });
};
