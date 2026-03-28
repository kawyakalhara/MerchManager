console.log("products.js loaded");
let products = [];
let filteredProducts = [];

fetch("http://localhost:3000/api/products")
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        return res.json();
    })
    .then(data => {
        products = data;
        filteredProducts = [...products];

        displayProducts(products);
        setupFilterListeners();
        updateCartCount();
    })
    .catch(err => {
        console.error("Error loading products:", err);
    });

function displayProducts(productsToShow = products) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    if (productsToShow.length === 0) {
        grid.innerHTML = "<p class='no-products'>No products found</p>";
        return;
    }

    grid.innerHTML = productsToShow
        .map(
            product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
          <div class="img-box">
          <img src="assets/${product.image}" alt="${product.name}" >
          
          </div>

          <h3>${product.name}</h3>
          <p class="price">Rs. ${product.price}</p>
          <button class="btn"
            onclick="event.stopPropagation(); addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      `
        )
        .join("");
}


// Filter products

function filterProducts() {
    const checkboxes = document.querySelectorAll(".filter-checkbox:checked");
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);

    if (selectedCategories.includes("all")) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p =>
            selectedCategories.includes(p.category)
        );
    }

    displayProducts(filteredProducts);
}


// Filter listeners

function setupFilterListeners() {
    const checkboxes = document.querySelectorAll(".filter-checkbox");

    checkboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            if (cb.value === "all" && cb.checked) {
                checkboxes.forEach(other => {
                    if (other.value !== "all") other.checked = false;
                });
            } else if (cb.value !== "all") {
                const allCheckbox = document.querySelector(
                    '.filter-checkbox[value="all"]'
                );
                if (allCheckbox) allCheckbox.checked = false;
            }

            filterProducts();
        });
    });

    const clearBtn = document.getElementById("clear-filters");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            checkboxes.forEach(cb => (cb.checked = cb.value === "all"));
            filterProducts();
        });
    }
}



function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = products.find(p => p.id === id);

    if (item) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.name} added to cart`);
        updateCartCount();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartEl = document.querySelector(".cart");
    if (cartEl) {
        cartEl.setAttribute("data-count", cart.length);
    }
}


function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}
