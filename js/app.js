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
const submission = document.getElementById('submission');
const parentElement = document.getElementById('product-display');
let votes = 25;
let uniqueImageArray = [];

function generateRandomIndexNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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

function renderThreeNewImages() {
  renderSingleImageElements();
  renderSingleImageElements();
  renderSingleImageElements();
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

submission.addEventListener('submit', handleSubmit);

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
    submission.removeEventListener('submit', handleSubmit);
    submission.innerHTML = '';
    tableParent.innerHTML = '';
    renderTotalsTable();
    findPercentageData();
    createObjClicksDataArray();
    createObjViewsDataArray();
    renderChart(findPercentageData(), 'percentage of votes', percentageChart, 'pie');
    renderChart(createObjClicksDataArray(), 'number of votes', clicksChart, 'bar');
    renderChart(createObjViewsDataArray(), 'number of views', viewsChart, 'bar');
  }
}

renderEmptyTable();
renderThreeNewImages();

function findPercentageData(){
  let percentageDataArray = [];

  for (let i = 0; i < productsArray.length; i++) {
    if (parseInt(productsArray[i].clicks) === 0 || parseInt(productsArray[i].displayCount) === 0 ) {
      percentageDataArray.push(0);
    } else {
      percentageDataArray.push(parseInt(productsArray[i].clicks) / parseInt(productsArray[i].displayCount) * 100);
    }
  }
  console.log(percentageDataArray);
}

function createLabelsArray() {
  let labelsArray = [];
  for (let i = 0; i < productsArray.length; i++) {
    labelsArray.push(productsArray[i].name);
  }
  return labelsArray;
}

function createObjClicksDataArray() {
  let objClicksDataArray = [];
  for (let i = 0; i < productsArray.length; i++) {
    objClicksDataArray.push(productsArray[i].clicks);
  }
  return objClicksDataArray;
}

function createObjViewsDataArray() {
  let objViewsDataArray = [];
  for (let i = 0; i < productsArray.length; i++) {
    objViewsDataArray.push(productsArray[i].displayCount);
  }
  return objViewsDataArray;
}


var clicksChart = document.getElementsById('clicksChart').getContext('2d');

var viewsChart = document.getElementsById('viewsChart').getContext('2d');

var percentageChart = document.getElementsById('percentageChart').getContext('2d');

function renderChart(data, dataLabel, chartName, type) {

  new Chart(chartName, {
    type: type,
    data: {
      labels: createLabelsArray(),
      datasets: [{
        label: dataLabel,
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
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

