/******************** GAME ***********************/

var game = document.querySelector('.game-window');
var basket = document.querySelector('.basket');
var fruits = document.querySelector('.fruits');

var basketLeft =
    parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
var basketBottom =
    parseInt(window.getComputedStyle(basket).getPropertyValue('bottom'));


var score = 0;

function moveBasketLeft() {
  if (basketLeft > 0) {
    basketLeft -= 30;
    basket.style.left = basketLeft + 'px';
  }
}

function moveBasketRight() {
  if (basketLeft < 620) {
    basketLeft += 30;
    basket.style.left = basketLeft + 'px';
  }
}

function control(e) {
  if (e.key == 'ArrowLeft') {
    moveBasketLeft();
  }
  if (e.key == 'ArrowRight') {
    moveBasketRight();
  }
}

function generateFruits() {
  var fruitBottom = 470;
  var fruitLeft = Math.floor(Math.random() * 620);
  var fruit = document.createElement('div');
  fruit.setAttribute('class', 'fruit');
  fruits.appendChild(fruit);

  function fallDownFruit() {
    if (fruitBottom < basketBottom + 50 && fruitBottom > basketBottom &&
        fruitLeft > basketLeft - 30 && fruitLeft < basketLeft + 80) {
      fruits.removeChild(fruit);
      clearInterval(fallInterval);
      score++;
    }
    if (fruitBottom < basketBottom) {
      alert('Game Over ! Your score is : ' + score);
      clearInterval(fallInterval);
      clearTimeout(fruitTimeout);
      location.reload();
    }
    fruitBottom -= 5;
    fruit.style.bottom = fruitBottom + 'px';
    fruit.style.left = fruitLeft + 'px';
  }
  var fallInterval = setInterval(fallDownFruit, 20);
  var fruitTimeout = setTimeout(generateFruits, 2000);
}

generateFruits();


document.addEventListener('keydown', control);


/******************** LOIS DE PROBA ***********************/


// Return random number between 0 & 1
function getRandom() {
  return Math.random();
}

// FONCTIONS LOIS DE PROBABILITÉ

// Variable aléatoire suivant la loi Uniforme
function getRandomUniforme(min, max) {
  let random = Math.floor(getRandom() * (max - min + 1) + min);
  return random;
}

// Variable aléatoire suivant la loi de Bernoulli
function getRandomBernoulli(x) {
  let random = getRandom();
  if (random < x) {
    return 1;
  } else {
    return 0;
  }
}

// Variable aléatoire suivant la loi Exponentielle
function getRandomExponentielle(x) {
  return -Math.log(getRandom()) / x;
}

// Variable aléatoire suivant la loi Géométrique
function getRandomGeometrique(x) {
  let a = 0;
  random = getRandomBernoulli(x);
  while (random != 1) {
    random = getRandomBernoulli(x);
    a++;
  }
  return a;
}


var tailleFruit = getRandomUniforme(1, 10);

console.log(tailleFruit);
console.log(getRandom());
console.log(getRandomBernoulli(0.5));
console.log(getRandomExponentielle(4));
console.log(getRandomGeometrique(0.1));
