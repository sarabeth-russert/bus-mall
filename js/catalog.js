/* global Product, Cart */

'use strict';

var cartCount = 0;

let productsArray = Product.allProducts;

var cart = new Cart([]);

function populateForm() {
  var selectElement = document.getElementById('items');
  for (let i = 0; i < productsArray.length; i++) {
    let optionElement = document.createElement('option');
    optionElement.setAttribute('value', productsArray[i].name);
    optionElement.textContent = productsArray[i].name;
    selectElement.appendChild(optionElement);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

function addSelectedItemToCart(event) {
  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].name === event.target.items.value){
    cart.addItem(productsArray[i].name, event.target.quantity.value);
    cartCount++;
    console.log(cart)
    }
  }
}

function updateCounter() {
  let cartCountElement = document.getElementById('itemCount');
  cartCountElement.textContent = cartCount;
}

function updateCartPreview() {
  var divBox = document.getElementById('cartContents');
  var pElement = document.createElement('p');
  pElement.textContent = `${event.target.quantity.value}: ${event.target.items.value}`;
  divBox.appendChild(pElement);
}

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

populateForm();
