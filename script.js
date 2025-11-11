
/*prod*/
function category(){
  const productContainer = document.getElementById("productContainer");

  document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      
      const category = link.parentElement.getAttribute("data-category");
      const type = link.getAttribute("data-type");

      loadProducts(category, type);
    });
  });
}

  // Load 
  function loadProducts(category, type) {
    fetch("products.json")
      .then(response => response.json())
      .then(products => {
        const filtered = products.filter(product =>
          product.category.toLowerCase() === category.toLowerCase() &&
          product.type.toLowerCase() === type.toLowerCase()
        );
        displayProducts(filtered);
      })
      .catch(error => {
        console.error("Failed to load products:", error);
        productContainer.innerHTML = "<p>Failed to load products.</p>";
      });
  }

  function displayProducts(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
      productContainer.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>₹${product.price}</strong>
 <button data-id="${product.id}" class="add-to-cart">Add to Cart</button> 
  <button data-id="${product.id}" class="add-to-wishlist"></button>
 `;

      productContainer.appendChild(card);
    });
  }

loadPopularItems();

function loadPopularItems() {
  const popularContainer = document.getElementById("popularItems");

  fetch("products.json")
    .then(response => response.json())
    .then(products => {
      const popular = products.filter(product => product.popular);
      if (popular.length === 0) {
        popularContainer.innerHTML = "<p>No popular items yet.</p>";
        return;
      }

      popular.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <strong>₹${product.price}</strong>
           <button data-id="${product.id}" class="add-to-cart">Add to Cart</button> 
           <button data-id="${product.id}" class="add-to-wishlist"></button>
        `;

        popularContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading popular items:", error);
    });
}
document.querySelectorAll(".dropdown-content a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const category = link.parentElement.getAttribute("data-category");
    const type = link.getAttribute("data-type");

    document.getElementById("popularItemsSection").style.display = "none";

    loadProducts(category, type);
  });
});

//cart
document.addEventListener('click', e => {
    if (e.target.matches('.add-to-cart')) {
        const id = parseInt(e.target.dataset.id);
        saveToLocalStorage('cart', id);
        removeFromStorage('wishlist',id);
        updateCartCount();
        updateWishlistCount();
        loadWishlistItems();
        alert('Added to cart!');
    }
});
document.addEventListener('click', e => {
    if (e.target.matches('.add-to-wishlist')) {
        const id = parseInt(e.target.dataset.id);
        saveToLocalStorage('wishlist', id);
        updateWishlistCount();
        alert('Added to wishlist!');
    }
});


function saveToLocalStorage(key, productId) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    if (!items.includes(productId)) {
        items.push(productId);
        localStorage.setItem(key, JSON.stringify(items));
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    document.querySelectorAll('#cart-count, #cart-item-count').forEach(el => {
        if (el) el.textContent = count;
    });
}
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const count = wishlist.length;
    const el = document.getElementById('wishlist-count');
    if (el) el.textContent = count;
}

  function loadCartItems() {
    const display = document.getElementById('cart-items-display');
    if (!display) return;

    const ids = JSON.parse(localStorage.getItem('cart')) || [];
    display.innerHTML = '';

    if (ids.length === 0) {
        display.innerHTML = `<p id="empty-cart-message">Your cart is empty. Start shopping!</p>`;
        document.getElementById('cart-subtotal').textContent = '0.00';
        return;
    }

    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            let total = 0;

            ids.forEach(id => {
                const product = products.find(p => p.id === id);
                if (product) {
                    total += product.price;
                    const div = document.createElement('div');
                    div.className = 'cart-item';

                    div.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" width="120" height="120">
                        <div class="cart-item-details">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                        </div>
                        <div class="">₹${product.price.toFixed(2)}</div>
                        <button class="remove-from-cart" data-id="${product.id}">Remove</button>
                    `;

                    display.appendChild(div);
                }
            });

            document.getElementById('cart-subtotal').textContent = total.toFixed(2);
        })
        .catch(error => {
            console.error("Error loading cart items:", error);
            display.innerHTML = "<p>Failed to load cart items.</p>";
        });
}


//wishlist
function loadWishlistItems() {
    const display = document.getElementById('wishlist-items-display');
    if (!display) return;

    const ids = JSON.parse(localStorage.getItem('wishlist')) || [];
    display.innerHTML = '';
    

    if (ids.length === 0) {
        display.innerHTML = `<p id="empty-wishlist-message">Your wishlist is empty. Browse products and add your favorites!</p>`;
        return;
    }
        fetch("products.json")
        .then(response => response.json())
        .then(products => {
           ids.forEach(id => {
          const product = products.find(p => p.id === id);
          if (product) {
              const div = document.createElement('div');
              div.className = 'wishlist-item';
              div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="120" height="120">
      <div class="wishlist-item-details">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">₹${product.price.toFixed(2)}</div>
      </div>
      <div class="wishlist-item-actions">
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          <button class="remove-from-wishlist" data-id="${product.id}">Remove</button>
      </div>
  `;

              display.appendChild(div);
          }
            });

        })
        if (ids.length === 0) {
        display.innerHTML = `<p id="empty-wishlist-message">Your wishlist is empty. Browse products and add your favorites!</p>`;
        return;
    }
        ;
}
function removeFromStorage(key, id) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items = items.filter(itemId => itemId !== id);
    localStorage.setItem(key, JSON.stringify(items));
}

//remove
document.addEventListener('click', e => {
    if (e.target.matches('.remove-from-cart')) {
        const id = parseInt(e.target.dataset.id);
        removeFromStorage('cart', id);
        loadCartItems();
        updateCartCount();
    }

    if (e.target.matches('.remove-from-wishlist')) {
        const id = parseInt(e.target.dataset.id);
        removeFromStorage('wishlist', id);
        loadWishlistItems();
        updateWishlistCount();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    loadWishlistItems()
    updateCartCount();
    updateWishlistCount();
    category();
    displayProducts();
   
});
