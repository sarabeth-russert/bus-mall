'use strict';

function Product(name) {
  this.filePath = `../images/${name}.jpg`;
  this.name = name;
  this.clicks = 0;
  this.displayCount = 0;
}

let productsArray = [];

productsArray.push(new Product('bag'));
productsArray.push(new Product('banana'));
productsArray.push(new Product('bathroom'));
productsArray.push(new Product('boots'));
productsArray.push(new Product('breakfast'));
productsArray.push(new Product('bubblegum'));
productsArray.push(new Product('chair'));
productsArray.push(new Product('cthulhu'));
productsArray.push(new Product('dog-duck'));
productsArray.push(new Product('dragon'));
productsArray.push(new Product('pen'));
productsArray.push(new Product('pet-sweep'));
productsArray.push(new Product('scissors'));
productsArray.push(new Product('shark'));
productsArray.push(new Product('tauntaun'));
productsArray.push(new Product('unicorn'));
productsArray.push(new Product('usb'));
productsArray.push(new Product('water-can'));
productsArray.push(new Product('wine-glass'));

const tableParent = document.getElementById('table');
const parentElement = document.getElementById('product-display');
let votes = 25;

function randomIndexNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function renderRandomImage() {
  let randomImage = productsArray[randomIndexNumber(productsArray.length)];
  randomImage.displayCount++;

  let imageElement = document.createElement('img');
  imageElement.setAttribute('src', randomImage.filePath);
  imageElement.setAttribute('alt', randomImage.name);
  imageElement.setAttribute('title', randomImage.name);
  let input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'image');
  input.setAttribute('value', randomImage.name);
  parentElement.appendChild(imageElement);
  parentElement.appendChild(input);

}


function renderEmptyTable() {
  for (let i = 0; i < productsArray.length; i++) {
    var tableRow = document.createElement('tr');
    tableRow.textContent = productsArray[i].name;
    tableParent.appendChild(tableRow);
  }
}

function renderTotalsTable() {
  for (let i = 0; i < productsArray.length; i++) {
    var tableRow = document.createElement('tr');
    tableRow.textContent = productsArray[i].name;
    tableParent.appendChild(tableRow);
    var tableData = document.createElement('td');
    tableData.textContent = `had ${productsArray[i].clicks} votes and was shown ${productsArray[i].displayCount} times`;
    tableRow.appendChild(tableData);
  }
}

parentElement.addEventListener('click', handleClick);

function handleClick(event) {
  let clickedProduct = event.target.alt;

  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].name === clickedProduct) {
      productsArray[i].clicks++;
    }
  }
  parentElement.innerHTML = '';
  renderRandomImage();
  renderRandomImage();
  renderRandomImage();
  votes--;
  console.log(votes);
  if (votes === 0) {
    parentElement.removeEventListener('click', handleClick);
    tableParent.innerHTML = '';
    renderTotalsTable();
  }
}

renderEmptyTable();
renderRandomImage();
renderRandomImage();
renderRandomImage();







