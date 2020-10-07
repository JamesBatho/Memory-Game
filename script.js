const gameContainer = document.getElementById("game");
let card1 = 0;
let card2 = 0;
let noClick = true;
let matches = 0;
let currentScore = 0;
let lowestScore = localStorage.lowestScore || null;
let numCards = 10;

// attempt at random colors

let num = window.prompt("Please enter how many matches you want");
numCards = num * 2;
const randomColors = [];
for (let i = 0; i < numCards / 2; i++) {
  let redValue = Math.floor(Math.random() * 255);
  let blueValue = Math.floor(Math.random() * 255);
  let greenValue = Math.floor(Math.random() * 255);
  let randomColor = `rgb(${redValue},${greenValue},${blueValue})`;
  randomColors.push(randomColor, randomColor);
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// let shuffledColors = shuffle(COLORS);
let shuffledRandom = shuffle(randomColors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.setAttribute("data-card", "card");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  function flipCard() {
    let color = event.target.className;
    event.target.style.backgroundColor = color;
    event.target.classList.add("flipped");
  }
  if (noClick) {
    return;
  }
  if (!card1 || !card2) {
    if (!card1) {
      card1 = event.target;
      flipCard();
      currentScore += 1;
      score.textContent = currentScore;
    } else {
      card2 = event.target;
      flipCard();
      currentScore += 1;
      score.textContent = currentScore;
    }
  }
  if (card1 == card2) {
    alert("Click a Different Card");
    currentScore -= 1;
    score.textContent = currentScore;
    card2 = 0;
  }
  if (card1 && card2) {
    noClick = true;
    if (card1.style.backgroundColor == card2.style.backgroundColor) {
      console.log("match!");
      card1 = 0;
      card2 = 0;
      matches += 1;
      noClick = false;
      if (matches == numCards / 2) {
        noClick = true;
        setTimeout(function () {
          alert(`You Win! With a score of ${currentScore}`);
          if (currentScore < lowestScore || lowestScore === null) {
            localStorage.lowestScore = currentScore;
            bestScore.textContent = currentScore;
          }
        }, 100);
      }
    } else {
      console.log("no match!");
      setTimeout(function () {
        card1.style.backgroundColor = "white";
        card2.style.backgroundColor = "white";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = 0;
        card2 = 0;
        noClick = false;
      }, 1000);
    }
  }
}

// when the DOM loads
// createDivsForColors(shuffledColors);
createDivsForColors(shuffledRandom);

// Buttons for Starting Game and Resetting
const startButton = document.createElement("button");
startButton.innerText = "Click to Start Game";
startButton.addEventListener("click", function () {
  noClick = false;
});
const resetButton = document.createElement("button");
resetButton.innerText = "Click to Reset Game";
resetButton.addEventListener("click", function () {
  let cards = document.querySelectorAll("div[data-card]");
  for (card of cards) {
    card.style.backgroundColor = "white";
    if (card.classList.contains("flipped")) {
      card.classList.remove("flipped");
    }
  }
  card1 = 0;
  card2 = 0;
  matches = 0;
  noClick = true;
  currentScore = 0;
  score.textContent = currentScore;
});
gameContainer.append(startButton);
gameContainer.append(resetButton);

// Displaying Score
const scoreBoard = document.createElement("span");
scoreBoard.textContent = "Your Score is: ";
let score = document.createElement("span");
score.textContent = currentScore;
scoreBoard.append(score);
gameContainer.append(scoreBoard);

// Best Score
const best = document.createElement("span");
best.textContent = "Your Best Score is: ";
const bestScore = document.createElement("span");
bestScore.textContent = lowestScore;
best.append(bestScore);
gameContainer.append(best);

// Clear Local Storage
const clearButton = document.createElement("button");
clearButton.textContent = "Clear Best Score";
clearButton.addEventListener("click", function () {
  localStorage.clear();
  bestScore.textContent = null;
});
gameContainer.append(clearButton);
