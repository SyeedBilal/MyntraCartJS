const Convenience_fee=99;

let CartItemsObjects = [];

onLoad();

function onLoad() {
  // Retrieve cart items from localStorage
  const cartItemsStr = localStorage.getItem('cartItems');
  cartProducts = cartItemsStr ? JSON.parse(cartItemsStr) : [];

  LoadCartItemsObjects();
  displayCartItems();
  displayCartIcon();
  displayCartSummary();
}
function displayCartSummary() {
  let cartSummaryElement = document.querySelector('.bag-summary');
  
  let totalMrp = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  // Calculate MRP, Discount, and Final Payment
  CartItemsObjects.forEach(Cartitem => {
    totalMrp += Cartitem.original_price;
    totalDiscount += (Cartitem.original_price - Cartitem.current_price);
  });

  finalPayment = totalMrp - totalDiscount + Convenience_fee;

  // Populate cart summary details
  cartSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${CartItemsObjects.length} items)</div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">Rs ${totalMrp}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">- Rs ${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">Rs ${Convenience_fee}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs ${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>`;
}

function LoadCartItemsObjects() {
  CartItemsObjects = cartProducts.map(itemId => {
    // Find the corresponding item in the items array
    return items.find(item => item.id === itemId);
  });
  console.log('Cart Products:', CartItemsObjects); // Log cart items for debugging
}

function displayCartItems() {
  let containerElement = document.querySelector('.bag-items-container');
  
  // Clear existing HTML
  containerElement.innerHTML = '';

  // Generate HTML for each cart item
  CartItemsObjects.forEach(item => {
   
    containerElement.innerHTML += generateItemHtml(item);// Append each item's HTML
  });
}

function generateItemHtml(item) {
  // Create the HTML for a single cart item
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}" alt="${item.item_name}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="removeFromCart('${item.id}')">X</div>
    </div>
  `;
}

function removeFromCart(itemId) {
  // Remove the item from cartProducts by its ID
  cartProducts = cartProducts.filter(id => id !== itemId);
  
  // Update localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  
  // Reload the page content
  LoadCartItemsObjects();
  displayCartItems();
  displayCartIcon();
  displayCartSummary();
}

function displayCartIcon() {
  const cartItemCountElement = document.querySelector('.cart-item-count');

  if (cartProducts.length > 0) {
    cartItemCountElement.style.display = 'block';
    cartItemCountElement.textContent = cartProducts.length;
  } else {
    cartItemCountElement.textContent = ""; // Clear content for empty cart
    cartItemCountElement.style.display = 'none';
  }
}
