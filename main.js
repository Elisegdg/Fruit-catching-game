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

// FONCTIONS LOIS DE PROBABILITÉ

function loiBernoulli(x) {
  if (x == 1) {
    return true;
  } else if (x == 0) {
    return false;
  } else {
    return false;
  }
}


function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * max);
}

function loiUniforme(a, b, x) {
  var densite = 1 / (b - a);
  var prob = densite * (x + 1 - x);

  return prob;
}

function loiGeometrique(p, a) {
  var prob = (p * (1 - p)) ^ (a - 1);
  return prob;
}

/*function loiExponentielle(L, a, b) {
  var f = ;
  var prob = ;
}*/



var tailleFruit = loiUniforme(1, 5, 1);

console.log(getRandomInt(4));
console.log(tailleFruit);