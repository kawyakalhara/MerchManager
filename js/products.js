const products = [
    { id: 1, name: "Varsity Hoodie", price: 45.00, image: "hoodie.jpg" },
    { id: 2, name: "Alumni Tee", price: 25.00, image: "tee.jpg" },
    { id: 3, name: "Campus Cap", price: 15.00, image: "cap.jpg" }
];

function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="assets/${product.image}" alt="${product.name}" width="100%">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

window.onload = () => { displayProducts(); updateCartCount(); };