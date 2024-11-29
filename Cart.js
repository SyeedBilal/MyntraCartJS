const items = [
    {
        id: '001',
        image: 'images/1.jpg',
        company: 'Carlton London',
        item_name: 'Rhodium-Plated CZ Floral Studs',
        original_price: 1045,
        current_price: 606,
        discount_percentage: 42,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 4.5,
            count: 1400,
        },
    },
    {
        id: '002',
        image: 'images/2.jpg',
        company: 'CUKOO',
        item_name: 'Women Padded Halter Neck Swimming Dress',
        original_price: 2599,
        current_price: 1507,
        discount_percentage: 42,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 4.3,
            count: 24,
        },
    },
    {
        id: '003',
        image: 'images/3.jpg',
        company: 'NUEVOSDAMAS',
        item_name: 'Women Red & White Printed A-Line Knee-Length Skirts',
        original_price: 1599,
        current_price: 495,
        discount_percentage: 69,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 4.1,
            count: 249,
        },
    },
    {
        id: '004',
        image: 'images/4.jpg',
        company: 'ADIDAS',
        item_name: 'Indian Cricket ODI Jersey',
        original_price: 999,
        current_price: 999,
        discount_percentage: 0,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 5.0,
            count: 10,
        },
    },
    {
        id: '005',
        image: 'images/5.jpg',
        company: 'Roadster',
        item_name: 'Pure Cotton T-shirt',
        original_price: 1399,
        current_price: 489,
        discount_percentage: 65,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 4.2,
            count: 3500,
        },
    },
    {
        id: '006',
        image: 'images/6.jpg',
        company: 'Nike',
        item_name: 'Men ReactX Running Shoes',
        original_price: 14995,
        current_price: 14995,
        discount_percentage: 0,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 0.0,
            count: 0,
        },
    },
    {
        id: '007',
        image: 'images/7.jpg',
        company: 'The Indian Garage Co',
        item_name: 'Men Slim Fit Regular Shorts',
        original_price: 1599,
        current_price: 639,
        discount_percentage: 60,
        rating: {
            stars: 4.2,
            count: 388,
        },
    },
    {
        id: '008',
        image: 'images/8.jpg',
        company: 'Nivea',
        item_name: 'Men Fresh Deodrant 150ml',
        original_price: 285,
        current_price: 142,
        discount_percentage: 50,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 4.2,
            count: 5200,
        },
    }
];
let cartProducts = []; // Descriptive variable name

function onLoad() {
  // Retrieve cart items from localStorage
  const cartItemsStr = localStorage.getItem('cartItems');
  cartProducts = cartItemsStr ? JSON.parse(cartItemsStr) : [];

  // Display items on the homepage (assuming you have a function for this)
  displayItemsOnHomepage();

  // Display the cart icon with the updated count
  displayCartIcon();
  removeLocalStroage();
}
function removeLocalStroage(){
  localStorage.removeItem('cartItems');
}
function addToCart(itemId) {
  // Prevent adding the same item multiple times
  if (!cartProducts.includes(itemId)) {
    cartProducts.push(itemId);
  }

  // Update localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartProducts));

  // Display the cart icon with the updated count
  displayCartIcon();
}

function displayCartIcon() {  // Update function name for consistency
  const cartItemCountElement = document.querySelector('.cart-item-count');

  if (cartProducts.length > 0) {
    cartItemCountElement.style.display = 'block';
    cartItemCountElement.textContent = cartProducts.length;
  } else {
    cartItemCountElement.textContent = ""; // Clear content for empty cart
    cartItemCountElement.style.display = 'none';
  }
}

function displayItemsOnHomepage() {
  const itemsContainerElement = document.querySelector('.items-container');
  if(!itemsContainerElement){     // to handle the case of cart-product page
    return; 
  }


//   Just Fo Learning purposue i have added onlclick on image to remove the local storage items 

  items.forEach(item => { // YOU CAN DYNAIMCALLY CREATE ELEMENTS AND APPEND THEM INTO ITEM-CONTAINER THEN ITEM-CONTAINER TO ITEMS-CONT....
    itemsContainerElement.innerHTML += `   
      <div class="item-container">
        <img src="${item.image}" alt="" class="item-image" onclick="removeLocalStroage()"> 
        <div class="rating">
          ${item.rating.stars} ★ | ${item.rating.count} ratings
        </div>
        <div class="company-name">
          ${item.company}
        </div>
        <div class="item-name">
          ${item.item_name}
        </div>
        <div class="price">
          <span class="current-price">${item.current_price}</span>
          <span class="original-price">${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% off)</span>
        </div>
        <button class="btn-add-bag" onclick="addToCart('${item.id}')">Add to Bag</button>
      </div>
    `;

  });

}

// Call onLoad to initialize everything when the page loads
window.onload = onLoad;
