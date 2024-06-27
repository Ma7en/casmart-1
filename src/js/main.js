"use strict";

/**
===========================================================
===========================================================
- 3- categories
**/
document.addEventListener("load", function () {
    // Fetch and display all products initially
    fetchAllProducts();

    // Fetch categories and display them
    fetch("https://dummyjson.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then((categories) => {
            console.log(`Categories: `, categories);
            let categoriesContainer = document.getElementById("categories");
            for (let i = 0; i < categories.length; i++) {
                let listItem = document.createElement("li");
                listItem.textContent = categories[i].name;
                listItem.addEventListener("click", function () {
                    fetchCategoryProducts(categories[i].slug);

                    let allListItems =
                        categoriesContainer.getElementsByTagName("li");
                    for (let j = 0; j < allListItems.length; j++) {
                        allListItems[j].classList.remove("active");
                    }

                    console.log(`90-->`, listItem);
                    listItem.classList.add("active");
                });
                categoriesContainer.appendChild(listItem);
            }

            // Add "All Products" option
            let allProductsItem = document.createElement("li");
            allProductsItem.textContent = "All Products";
            allProductsItem.addEventListener("click", fetchAllProducts);
            categoriesContainer.insertBefore(
                allProductsItem,
                categoriesContainer.firstChild
            );
        });

    // Function to fetch and display all products
    function fetchAllProducts() {
        fetch("https://dummyjson.com/products")
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(`All products: `, data);
                displayProducts(data.products);
            });
    }

    // Function to fetch products for a given category and display them
    function fetchCategoryProducts(category) {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(`Products in category ${category}: `, data);
                displayProducts(data.products);
            });
    }

    // Function to display products
    function displayProducts(products) {
        let productContainer = document.getElementById("product-list");
        productContainer.innerHTML = ""; // Clear previous products
        products.forEach((product) => {
            productContainer.innerHTML += `
    <li class="product-card">
        <div >
            <figure class="card-banner">
                <a>
                    <img
                        src="${product.images[0]}"
                        alt="${product.title}"
                        loading="lazy"
                        width="800"
                        height="1034"
                        class="w-100"
                    />
                </a>


                <div class="card-actions">
                    <a href="product.html?id=${product.id}"
                        class="card-action-btn"
                        aria-label="Quick view"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112" />
                            <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                        </svg>
                    </a>

                    <button
                        class="card-action-btn cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16Zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32" />
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 224v16a96 96 0 0 0 96 96h0a96 96 0 0 0 96-96v-16" />
                        </svg>

                        <p>Add to Cart</p>
                    </button>


                </div>
            </figure>

            <div class="card-content">
                <h2 class="h4 card-title">
                    <a>${product.title}</a>
                </h2>

                <div class="card-price">
                    <data value="${product.price}"
                        >&pound;${product.price}</data
                    >
                </div>
            </div>
        </div>
    </li>
            `;
        });
    }
});

/**
===========================================================
===========================================================
- -3-1 => categories navigation 
**/
document.addEventListener("load", function () {
    let prodCont = [...document.querySelectorAll("#categories")];
    let nexBtn = [...document.querySelectorAll(".nav-categories .next-btn")];
    let preBtn = [...document.querySelectorAll(".nav-categories .pre-btn")];
    // console.log(`1--> `, prodCont, "2-->", nexBtn, "3-->", preBtn);

    prodCont.forEach((item, i) => {
        let containerDimesions = item.getBoundingClientRect();
        let containerWidth = containerDimesions.width;
        // console.log(`5->`, containerDimesions);
        // console.log(`6->`, containerWidth);

        nexBtn[i].addEventListener("click", () => {
            item.scrollLeft += containerWidth;
        });

        preBtn[i].addEventListener("click", () => {
            item.scrollLeft -= containerWidth;
        });
    });
});

/**
===========================================================
===========================================================
- -3. Search Functionality
**/
let searchDiv = document.querySelector("#searchDiv");
document.addEventListener("load", function () {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "search");
    searchInput.setAttribute("placeholder", "Search products...");

    searchDiv.appendChild(searchInput);

    searchInput.addEventListener("keyup", function () {
        const searchQuery = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product-card");
        products.forEach((product) => {
            const title = product.querySelector("h2").textContent.toLowerCase();
            if (title.includes(searchQuery)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
});

/**
===========================================================
===========================================================
- -4. Shopping Cart
**/
let cart = [];
let modelCart = document.querySelector(".model-cart");

function updateCartNumber() {
    let numberCart = document.querySelector(
        ".header .header-action-btn.view .btn-badge"
    );
    numberCart.textContent = cart.length;
}

function addToCart(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            // Check if the product is already in the cart
            let cartItem = cart.find((item) => item.id === productId);
            if (cartItem) {
                // If the product is already in the cart, increase its quantity
                cartItem.quantity++;
                updateCartNumber();
            } else {
                // If the product is not in the cart, add it with quantity 1
                product.quantity = 1;
                cart.push(product);
                updateCartNumber();
            }
            console.log("120-->>", cart);
            // displayCart();
        });
}

function displayCart() {
    modelCart.classList.add("active");

    let cartContainer = document.querySelector(".model-cart #list-products");
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
        console.log(`156-->`, product);
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div class="image">
                    <img src="${product.images[0]}" alt="${product.title}">
                </div>
                <div class="content">
                    <div>
                        <h2>${product.title}</h2>
                        <p>
                            <strong>
                                Price: 
                            </strong>
                            &pound;${product.price}</p>
                        <p>
                            <strong>
                                quantity: 
                                ${product.quantity}
                            </strong>
                        </p>
                    </div>
                    <div>
                        <button onclick="removeFromCart(${product.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    calculateTotal();
}

function removeFromCart(productId) {
    let cartItem = cart.find((item) => item.id === productId);
    if (cartItem.quantity > 1) {
        // If there's more than one item, decrease the quantity
        cartItem.quantity--;
        updateCartNumber();
    } else {
        // If there's only one item, remove it from the cart
        cart = cart.filter((item) => item.id !== productId);
        updateCartNumber();
    }
    displayCart();
}

function calculateTotal() {
    let total = cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
    let totalEl = document.querySelector(".model-cart #total");
    totalEl.textContent = `Total: £${total.toFixed(2)}`;
}

// let shops = document.querySelector("#shops");
document.addEventListener("load", function () {
    let viewCart = document.querySelector(".header .header-action-btn.view");
    viewCart.addEventListener("click", displayCart);

    let numberCart = document.querySelector(
        ".header .header-action-btn.view .btn-badge"
    );
    numberCart.textContent = cart.length;

    let closeCart = document.querySelector(".model-cart .model-close-btn");
    closeCart.addEventListener("click", function () {
        modelCart.classList.remove("active");
    });
});

/**
===========================================================
===========================================================
- -icon login =>
**/
document.addEventListener("load", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(`1-->`, user);
    if (user) {
        function profile() {
            window.location.href = "profile.html";
        }
        let signLabel = document.querySelector(
            ".header .sign .header-action-label"
        );
        // console.log(`-->>`, signLabel);
        signLabel.textContent = "Profile";
        signLabel.addEventListener("click", profile);
    }
});
