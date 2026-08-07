// ===========================
// BUSTERBUILD CART
// ===========================

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fix old cart items
cart = cart.map(item => ({
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity) || 1
}));

localStorage.setItem("cart", JSON.stringify(cart));

// ===========================
// ADD TO CART
// ===========================

function addToCart(name, price){

    price = Number(price);

    let existing = cart.find(item => item.name === name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            name:name,
            price:price,
            quantity:1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart");

}

// ===========================
// UPDATE CART COUNT
// ===========================

function updateCartCount(){

    let cartCount = document.getElementById("cart-count");

    if(!cartCount) return;

    let total = 0;

    cart.forEach(item=>{

        total += Number(item.quantity);

    });

    cartCount.textContent = total;

}

// ===========================
// DISPLAY CART
// ===========================

function displayCart(){

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if(!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `
        <div class="cart-empty">
            <h3>Your cart is empty.</h3>
            <p>Add products to start shopping.</p>
        </div>
        `;

        cartTotal.innerHTML = "Total: R0.00";

        return;

    }

    let total = 0;

    cart.forEach((item,index)=>{

        let lineTotal = item.price * item.quantity;

        total += lineTotal;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>Price: <strong>R${item.price.toFixed(2)}</strong></p>

                <p>Total: <strong>R${lineTotal.toFixed(2)}</strong></p>

            </div>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

                <button class="remove-btn" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>

            </div>

        </div>

        `;

    });

    cartTotal.innerHTML = "Total: R" + total.toFixed(2);

}
// ===========================
// INCREASE QUANTITY
// ===========================

function increaseQuantity(index){

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();

}

// ===========================
// DECREASE QUANTITY
// ===========================

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();

}

// ===========================
// REMOVE ITEM
// ===========================

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();

}

// ===========================
// WISHLIST
// ===========================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(name){

    if(!wishlist.includes(name)){

        wishlist.push(name);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert(name + " added to wishlist");

    }else{

        alert(name + " is already in your wishlist");

    }

}

function displayWishlist(){

    let wishlistItems = document.getElementById("wishlist-items");

    if(!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if(wishlist.length === 0){

        wishlistItems.innerHTML = `
        <div class="wishlist-box">
            <i class="fa-solid fa-heart"></i>
            <h3>Your Wishlist is Empty</h3>
            <p>Products you save will appear here.</p>
        </div>
        `;

        return;

    }

    wishlist.forEach((product,index)=>{

        wishlistItems.innerHTML += `
        <div class="wishlist-card">

            <i class="fa-solid fa-heart"></i>

            <h3>${product}</h3>

            <button class="remove-wishlist-btn"
                onclick="removeFromWishlist(${index})">

                <i class="fa-solid fa-trash"></i>

                Remove

            </button>

        </div>
        `;

    });

}

function removeFromWishlist(index){

    wishlist.splice(index,1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();

}
// ===========================
// LOAD PAGE
// ===========================

document.addEventListener("DOMContentLoaded", function(){

    updateCartCount();

    displayCart();

    displayWishlist();

    displayCheckout();

    loadPaymentTotal();

});

// ===========================
// CHECKOUT PAGE
// ===========================

function displayCheckout(){

    const checkoutItems = document.getElementById("checkout-items");

    if(!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(function(item){

        let quantity = Number(item.quantity);
        let price = Number(item.price);
        let total = quantity * price;

        subtotal += total;

        checkoutItems.innerHTML += `

        <div class="summary-item">

            <div>

                <h4>${item.name}</h4>

                <p>Quantity: ${quantity}</p>

            </div>

            <strong>R${total.toFixed(2)}</strong>

        </div>

        `;

    });

    let delivery = subtotal >= 1000 ? 0 : (subtotal > 0 ? 100 : 0);

    let grandTotal = subtotal + delivery;

    const subtotalEl = document.getElementById("checkout-subtotal");
    const deliveryEl = document.getElementById("checkout-delivery");
    const totalEl = document.getElementById("checkout-total");

    if(subtotalEl) subtotalEl.innerHTML = "R" + subtotal.toFixed(2);

    if(deliveryEl){
        deliveryEl.innerHTML = delivery === 0 ? "FREE" : "R" + delivery.toFixed(2);
    }

    if(totalEl){
        totalEl.innerHTML = "R" + grandTotal.toFixed(2);
    }

}

// ===========================
// PAYMENT PAGE
// ===========================

function loadPaymentTotal(){

    let total = 0;

    cart.forEach(function(item){

        total += item.price * item.quantity;

    });

    if(total > 0 && total < 1000){

        total += 100;

    }

    let paymentTotal = document.getElementById("payment-total");

    if(paymentTotal){

        paymentTotal.innerHTML = "R" + total.toFixed(2);

    }

}
// ===========================
// COMPLETE ORDER
// ===========================

function completeOrder(){

    let customerName = localStorage.getItem("customerName") || "";
    let customerPhone = localStorage.getItem("customerPhone") || "";
    let customerAddress = localStorage.getItem("customerAddress") || "";
    let deliveryMethod = localStorage.getItem("deliveryMethod") || "";

    let orderMessage = "NEW BUSTERBUILD HARDWARE ORDER%0A%0A";

    orderMessage += "Customer: " + customerName + "%0A";
    orderMessage += "Phone: " + customerPhone + "%0A";
    orderMessage += "Delivery: " + deliveryMethod + "%0A";

    if(deliveryMethod === "Home Delivery"){

        orderMessage += "Address: " + customerAddress + "%0A";

    }

    orderMessage += "%0AProducts:%0A";

    let total = 0;

    cart.forEach(function(item){

        let lineTotal = item.price * item.quantity;

        total += lineTotal;

        orderMessage +=
            item.name +
            " x" +
            item.quantity +
            " - R" +
            lineTotal.toFixed(2) +
            "%0A";

    });

    if(total > 0 && total < 1000){

        total += 100;

    }

    orderMessage += "%0A%0ATotal: R" + total.toFixed(2);

    localStorage.setItem("lastOrder", JSON.stringify(cart));

    localStorage.removeItem("cart");

    localStorage.setItem("lastOrder", JSON.stringify(cart));
localStorage.removeItem("cart");

window.location.href = "order-success.html";

}

// ===========================
// PRODUCT SEARCH
// ===========================

function searchProducts(){

    let input = document.getElementById("search-input");

    if(!input) return;

    let searchValue = input.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product){

        let productName = product.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(searchValue)){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}