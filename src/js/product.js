/**
===========================================================
===========================================================
- fetch product by id 
**/

// Fetch product details based on ID from query parameter
window.addEventListener("load", function () {
    // Extract product ID from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    function fetchProductDetails(productId) {
        const productsUrl = "https://dummyjson.com/products"; // Replace with your actual API endpoint
        fetch(`${productsUrl}/${productId}`)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // console.log(`All products: `, data);
                displayProductDetails(data);
            })
            .catch((error) => {
                console.log(`${error.message}`);
            });
    }

    function displayProductDetails(product) {
        const productDetailsDiv = document.querySelector(
            ".product-details .content"
        );
        if (!productDetailsDiv) {
            console.error("Product details element not found.");
            return;
        }
        productDetailsDiv.innerHTML += `
            <div class="prod">
                <figure class="card-banner">
                    <a>
                        <img src="${product.images[0]}" alt="${product.title}">
                    </a>
                </figure>

                <div class="cont">
                    <div>
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>
                                        Price: 
                                    </strong>
                                </td>
                                <td>
                                    ${product.price}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Rating: 
                                    </strong>
                                </td>
                                <td>
                                    
                                    <span>
                                    ${`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M394 480a16 16 0 0 1-9.39-3L256 383.76L127.39 477a16 16 0 0 1-24.55-18.08L153 310.35L23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480" />
                                    </svg>`.repeat(Math.floor(product.rating))}
                                    ${
                                        product.rating % 1 !== 0
                                            ? `
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                                <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M480 208H308L256 48l-52 160H32l140 96l-54 160l138-100l138 100l-54-160Z" />
                                                <path fill="currentColor" d="M256 48v316L118 464l54-160l-140-96h172z" />
                                            </svg>
                                            `
                                            : ""
                                    }
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Stock: 
                                    </strong>
                                </td>
                                <td>
                                    ${product.stock}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Return Policy: 
                                    </strong>
                                </td>
                                <td>
                                    ${product.returnPolicy}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Shipping Information: 
                                    </strong>
                                </td>
                                <td>
                                    ${product.shippingInformation}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Warranty Information: 
                                    </strong>
                                </td>
                                <td>
                                    ${product.warrantyInformation}    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Weight: 
                                    </strong>
                                </td>
                                <td>
                                    ${product.weight}kg
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div class="reviews">
                <h3>Reviews:</h3>
                ${product.reviews
                    .map(
                        (review) => `
                    <div class="review">
                        <div>
                            <img src="./images/header/avter-1.png" alt="${
                                review.reviewerName
                            }">
                            <p>
                                <strong>
                                    ${review.reviewerName}
                                </strong>
                            </p>
                            <p>
                                <strong>
                                    (${review.reviewerEmail})
                                </strong>
                            </p>
                        </div>
                        
                        <div>
                            <p>
                                <strong>
                                    Comment: 
                                </strong>
                                ${review.comment}
                            </p>
                            <p class="star">
                                <strong>
                                    Rating: 
                                </strong>
                                <span>
                                    ${`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M394 480a16 16 0 0 1-9.39-3L256 383.76L127.39 477a16 16 0 0 1-24.55-18.08L153 310.35L23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480" />
                                        </svg>`.repeat(
                                        Math.floor(review.rating)
                                    )}
                                    ${
                                        review.rating % 1 !== 0
                                            ? `
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                                <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M480 208H308L256 48l-52 160H32l140 96l-54 160l138-100l138 100l-54-160Z" />
                                                <path fill="currentColor" d="M256 48v316L118 464l54-160l-140-96h172z" />
                                            </svg>
                                            `
                                            : ""
                                    }
                                </span>
                            </p>
                            <p>
                                <strong>
                                    Date: 
                                <strong>    
                                ${new Date(review.date).toLocaleDateString()}
                            <strong></p>
                        </div>
                    </div>
                `
                    )
                    .join("")}
            </div>

            <div class="com">
                <form action="#">
                    <input type="text" name="" id="" placeholder="Enter your comment" required />
                    <button >Send</button>
                </form>
            </div>

        `;
    }

    // Fetch and display product details
    fetchProductDetails(productId);
});

// =================================================================
// =================================================================

// Extract product ID from query parameter
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");

// // Fetch product details based on ID from query parameter
// async function fetchProductDetails(productId) {
//     const productsUrl = "https://dummyjson.com/products"; // Replace with your actual API endpoint
//     try {
//         const response = await fetch(`${productsUrl}/${productId}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const product = await response.json();
//         console.log(`1-->`, product);
//         displayProductDetails(product);
//     } catch (error) {
//         console.error("Error fetching product details:", error);
//     }
// }

// function displayProductDetails(product) {
//     const productDetailsDiv = document.querySelector(
//         ".product-details .content"
//     );
//     if (!productDetailsDiv) {
//         console.error("Product details element not found.");
//         return;
//     }
//     productDetailsDiv.innerHTML = `
//         <img src="${product.images[0]}" alt="${product.title}">
//         <h2>${product.title}</h2>
//         <p>${product.description}</p>
//         <p class="price">price: ${product.price}</p>

//         <p> rating: ${product.rating}</p>
//         <p>stock: ${product.stock}</p>

//     `;
// }

// // Fetch and display product details
// fetchProductDetails(productId);
