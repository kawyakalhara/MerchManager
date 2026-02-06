// Load and display cart items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // Display each item
    cart.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>Rs. ${product.price.toFixed(2)}</td>
            <td>1</td>
            <td>Rs. ${product.price.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update totals
    updateCartTotals();
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Update cart totals
function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const subtotal = cart.reduce((total, product) => {
        return total + product.price;
    }, 0);

    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `Rs. ${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `Rs. ${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `Rs. ${total.toFixed(2)}`;
}

// Handle checkout
function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate total
    const subtotal = cart.reduce((total, product) => {
        return total + product.price;
    }, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    // Here you can add your checkout logic
    // For now, just show an alert
    alert(`Processing checkout for Rs. ${total.toFixed(2)}`);
    
    // Clear cart after checkout (optional)
    // localStorage.setItem('cart', JSON.stringify([]));
    // loadCart();
}

// Initialize on page load
window.onload = () => {
    loadCart();

    // Add checkout button listener
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

