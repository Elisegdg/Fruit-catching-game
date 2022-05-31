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

// Variable aléatoire suivant la loi box muller
function getRandomBoxMuller(expectation, variance) {
  let u1 = getRandom();
  let u2 = getRandom();

  let r = Math.sqrt(-2 * Math.log(u1));
  let T = 2 * u2 * Math.PI;

  let X = r * Math.cos(T);

  return expectation + variance * X;
}


// var tailleFruit = getRandomUniforme(1, 10);

// console.log(tailleFruit);
// console.log(getRandom());
// console.log(getRandomBernoulli(0.5));
// console.log(getRandomExponentielle(9) * 100);
//  console.log(getRandomGeometrique(0.1));
//  console.log(getRandomBoxMuller(5, 0.9));



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

let range = 0.2;
let large = 50;

let minSpeed = 6;
let maxSpeed = 8;

function generateFruits() {
  var fruitBottom = 470;
  var fruitLeft = getRandomBoxMuller(310, large);
  if (fruitLeft < 0) {
    fruitLeft = 4;
  } else if (fruitLeft > 620) {
    fruitLeft = 610;
  }
  console.log(large);

  var fruit = document.createElement('div');

  var speed = getRandomUniforme(minSpeed, maxSpeed);

  // console.log(fruitLeft);

  var rand = getRandomUniforme(20, 60);
  // console.log(rand);
  fruit.style.width = rand + 'px';
  fruit.style.height = rand + 'px';

  if (getRandomBernoulli(range) == 1) {
    fruit.setAttribute('class', 'bomb');
    fruits.appendChild(fruit);

    function fallDownFruit() {
      if (fruitBottom < basketBottom + 50 && fruitBottom > basketBottom &&
          fruitLeft > basketLeft - 30 && fruitLeft < basketLeft + 80) {
        alert('BOMB ! Game Over ! Your score is : ' + score);
        clearInterval(fallIntervalFruit);
        clearTimeout(fruitTimeout);
        location.reload();
      }
      if (fruitBottom < basketBottom) {
        fruits.removeChild(fruit);
        clearInterval(fallIntervalFruit);
      }
      fruitBottom -= 7;
      fruit.style.bottom = fruitBottom + 'px';
      fruit.style.left = fruitLeft + 'px';
    }


  } else {
    fruit.setAttribute('class', 'fruit');
    fruits.appendChild(fruit);

    function fallDownFruit() {
      if (fruitBottom < basketBottom + 50 && fruitBottom > basketBottom &&
          fruitLeft > basketLeft - 30 && fruitLeft < basketLeft + 80) {
        fruits.removeChild(fruit);
        clearInterval(fallIntervalFruit);
        score++;
        range += 0.01;
        large += 10;
        minSpeed -= 0.2;
        maxSpeed -= 0.2;
      }
      if (fruitBottom < basketBottom) {
        alert('Fruit has fall ! Game Over ! Your score is : ' + score);
        clearInterval(fallIntervalFruit);
        clearTimeout(fruitTimeout);
        location.reload();
      }


      fruitBottom -= speed;
      fruit.style.bottom = fruitBottom + 'px';
      fruit.style.left = fruitLeft + 'px';
    }
  }

  var a = getRandomGeometrique(range);
  if (a == 7) {
    fruit.setAttribute('class', 'golden');
    fruits.appendChild(fruit);

    function fallDownFruit() {
      if (fruitBottom < basketBottom + 50 && fruitBottom > basketBottom &&
          fruitLeft > basketLeft - 30 && fruitLeft < basketLeft + 80) {
        fruits.removeChild(fruit);
        clearInterval(fallIntervalFruit);
        score += 10;
        range += 0.02;
        large += 10;
      }
      if (fruitBottom < basketBottom) {
        fruits.removeChild(fruit);
        clearInterval(fallIntervalFruit);
      }
      fruitBottom -= 7;
      fruit.style.bottom = fruitBottom + 'px';
      fruit.style.left = fruitLeft + 'px';
    }

    a = 0;
  }

  var fallIntervalFruit = setInterval(fallDownFruit, 40);
  var fruitTimeout = setTimeout(generateFruits, 2000);
}


generateFruits();

/*var scoreZone = document.getElementById('score');
var texte = document.createTextNode('Score : ' + score);
scoreZone.appendChild(texte);*/

document.addEventListener('keydown', control);
