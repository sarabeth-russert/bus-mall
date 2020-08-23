'use strict';

// global variables

let productsArray;
const tableParent = document.getElementById('table');
const submission = document.getElementById('submission');
const parentElement = document.getElementById('product-display');
let votes = 25;
let uniqueImageArray = [];

//checking for local data to populate the product array, if not calling to instantiate new product objects

function checkLocalStorageToFillArray() {
  if (localStorage.getItem('products') === null) {
    productsArray = [];
    instantiateNewProductObjects();
  }
  else {
    let getProducts = localStorage.getItem('products');
    productsArray = JSON.parse(getProducts);
  }
}

// stores all object data aquired

function storeLocalData() {
  let stringifyObjects = JSON.stringify(productsArray);
  localStorage.setItem('products', stringifyObjects);
}

// object constructor

function Product(name) {
  this.filePath = `img/${name}.jpg`;
  this.name = name;
  this.clicks = 0;
  this.displayCount = 0;
}

// instantiates all products and pushes them to product array

function instantiateNewProductObjects() {
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
}

function generateRandomIndexNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// takes the result of the random number generator and gets a product from the Products array. Checks to see if there is already a product in the unique image array matching that index number.

function generateUniqueRandomImage() {
  let randomIndexNumber = generateRandomIndexNumber(productsArray.length);

  while (uniqueImageArray.includes(randomIndexNumber)) {
    randomIndexNumber = generateRandomIndexNumber(productsArray.length);
  }

  uniqueImageArray.push(randomIndexNumber);

  while (uniqueImageArray.length > 6) {
    uniqueImageArray.shift();
  }

  productsArray[randomIndexNumber].displayCount++;
  return (productsArray[randomIndexNumber]);
}

// the process for rendering a single image with radio button

function renderSingleImageElements() {
  let randomImageObject = generateUniqueRandomImage();
  let imageElement = document.createElement('img');
  imageElement.setAttribute('src', randomImageObject.filePath);
  imageElement.setAttribute('alt', randomImageObject.name);
  imageElement.setAttribute('title', randomImageObject.name);
  let input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('class', 'productChoice');
  input.setAttribute('name', 'productChoice');
  input.setAttribute('value', randomImageObject.name);
  input.setAttribute('checked', 'checked');
  parentElement.appendChild(imageElement);
  parentElement.appendChild(input);
}

// three- could easily be altered if we needed to add more

function renderThreeNewImages() {
  renderSingleImageElements();
  renderSingleImageElements();
  renderSingleImageElements();
}

// creates an empty table to display with just the product names before the votes are tallied

function renderEmptyTable() {
  for (let i = 0; i < productsArray.length; i++) {
    var tableRow = document.createElement('tr');
    tableRow.textContent = productsArray[i].name;
    tableParent.appendChild(tableRow);
  }
}

// fills that table with the voting results

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

// creates an array from the product names to use in all the charts as labels

function createLabelsArray() {
  let labelsArray = [];
  for (let i = 0; i < productsArray.length; i++) {
    labelsArray.push(productsArray[i].name);
  }
  return labelsArray;
}

// finds the percentage of votes to times displayed per product for the percentage chart. Is called after the voting is completed

function createPercentageDataArray(){
  let percentageDataArray = [];

  for (let i = 0; i < productsArray.length; i++) {
    if (parseInt(productsArray[i].clicks) === 0 || parseInt(productsArray[i].displayCount) === 0 ) {
      percentageDataArray.push(0);
    } else {
      percentageDataArray.push(parseInt(productsArray[i].clicks) / parseInt(productsArray[i].displayCount) * 100);
    }
  }
  return percentageDataArray;
}

// creates a data array for clicks per product for the click chart

function createObjClicksDataArray() {
  let objClicksDataArray = [];
  for (let i = 0; i < productsArray.length; i++) {
    objClicksDataArray.push(productsArray[i].clicks);
  }
  return objClicksDataArray;
}

// creates a data array for views per product for the products chart

function createObjViewsDataArray() {
  let objViewsDataArray = [];
  for (let i = 0; i < productsArray.length; i++) {
    objViewsDataArray.push(productsArray[i].displayCount);
  }
  return objViewsDataArray;
}

// chart for clicks per item

function renderClicksChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var clicksChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: createLabelsArray(),
      datasets: [{
        label: '# of Votes',
        data: createObjClicksDataArray(),
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// chart for views per item
function renderViewsChart() {
  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var viewsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: createLabelsArray(),
      datasets: [{
        label: '# of Views',
        data: createObjViewsDataArray(),
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// chart for percentage of clicks for the times displayed

function renderPercentageChart() {
  var ctx3 = document.getElementById('myChart3').getContext('2d');
  var percentageChart = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: createLabelsArray(),
      datasets: [{
        label: '% of times voted for',
        data: createPercentageDataArray(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// changes the greeting header in the voting pane once voting has been completed

function youreWelcome(){
  let votingGreeterContainer = document.getElementById('thank-you-container');
  let votingGreeter = document.getElementById('thank-you');
  votingGreeter.innerHTML = '';
  let headerElement = document.createElement('h2');
  headerElement.textContent = 'Thank you for voting!';
  votingGreeterContainer.appendChild(headerElement);
}

// attaches a listener to the submit button

submission.addEventListener('submit', handleSubmit);

// submit handler function: increments product clicks if the item was selected. Clears out the voting pane and adds three new images to be voted on. Once the voting session is complete clears out the voting pane and changes the greeter. Renders the data table and charts and turns off the event listener. Stores local data.

function handleSubmit(event) {
  event.preventDefault();
  let choices = document.getElementsByClassName('productChoice');
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      var chosenProduct = choices[i].value;
    }
  }

  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].name === chosenProduct) {
      productsArray[i].clicks++;
    }
  }
  parentElement.innerHTML = '';
  renderThreeNewImages();
  votes--;
  if (votes === 0) {
    storeLocalData();
    submission.removeEventListener('submit', handleSubmit);
    submission.innerHTML = '';
    tableParent.innerHTML = '';
    youreWelcome();
    renderTotalsTable();
    renderClicksChart();
    renderViewsChart();
    createPercentageDataArray();
    renderPercentageChart();

  }
}

// Initalizes the page upon loading

checkLocalStorageToFillArray();
renderEmptyTable();
renderThreeNewImages();
