/* global Cart */
'use strict';

var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('items')) || [];
  cart = new Cart(cartItems);
}

function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  table.innerHTML = '';
}

function showCart() {
  let tHeadElement = document.createElement('thead');
  table.appendChild(tHeadElement);
  console.log(cart)

  for(var i=0;i<cart.items.length;i++){
    let trElement = document.createElement('tr');
    tHeadElement.appendChild(trElement);

    let thRemove = document.createElement('th');
    thRemove.textContent = 'X';
    thRemove.setAttribute('abbr', cart.items[i].product)
    let thQuantity = document.createElement('th');
    thQuantity.textContent = cart.items[i].quantity;
    let thItem = document.createElement('th');
    thItem.textContent = cart.items[i].product;
    trElement.appendChild(thRemove);
    trElement.appendChild(thQuantity);
    trElement.appendChild(thItem);
  }
}

function removeItemFromCart(event) {
  console.log(cart.items)
  for(var i=0;i<cart.items.length;i++){
   if(event.target.abbr === cart.items[i].product){
     cart.removeItem(i)
   }
   cart.saveToLocalStorage();
   renderCart();
  }
}

renderCart();
