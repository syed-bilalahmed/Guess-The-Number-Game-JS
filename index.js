// genrate  random positive number
let randomNumber = parseInt(Math.random() * 100 + 1);
         console.log(randomNumber);
// all selectors
const submit = document.querySelector("#submit");
const userInput = document.querySelector("#guessFeild");
const guessSlot = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultPara");
// create new tag  fro restart game fro result
const p = document.createElement("h2");
// previous guess will store in below array
let prevGuess = [];
// attemps
let numOfGuess = 1;
// must take this varible to start game
let playGame = true;

//if true then add events
if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

//methods

function validateGuess(guess) {

  if (isNaN(guess)) {
    alert("Please enter a  valid number");
  } else if (guess < 1) {
    alert("Please enter a  number greater than 1");
  } else if (guess > 100) {
    alert("Please enter a  number less than 100");
  } else {
    // here we will push all previose attemtp in array
    prevGuess.push(guess);

    if (numOfGuess === 11) {
      displayGuess(guess);
      displayMessage(`<h3 class="badge badge-success">Game over, random number was: ${randomNumber}</h3>`);
      endGame()
    } else {
        displayGuess(guess)
        checkGuess(guess);
    }
  }
}
// Function to check the guess against the random number
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`Congrats! You got it in ${numOfGuess - 1} attempts`, 'success');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is too small, guess another number in ${11 - numOfGuess} attempts`, 'danger');
  } else if (guess > randomNumber) {
    displayMessage(`Number is too large, guess another number in ${11 - numOfGuess} attempts`, 'warning');
  }
}

// Function to display messages with dynamic Bootstrap badge class
function displayMessage(message, bootstrapClass) {
  lowOrHi.innerHTML = `<h2 class="badge badge-${bootstrapClass}">${message}</h2>`;
  
}


function displayGuess(guess) {  //clean up method
    userInput.value="";
    guessSlot.innerHTML += `${guess}, `;
    numOfGuess++;
    lastResult.innerHTML=`${11-numOfGuess}`
}

function endGame(guess) {
    userInput.value='';
    userInput.setAttribute("disabled"," ")
    p.classList.add("button");
    p.innerHTML = `<button class="badge badge-primary" id="newGame"> Start New Game </button>`;
    //add new p tag in div
    startOver.prepend(p);
    playGame=false;
    newGame()
}

function newGame(guess) {
   const newGameButton = document.querySelector('#newGame');
   newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess=[];
   numOfGuess=1;
   guessSlot.innerHTML='';
   lastResult.innerHTML=`${11-numOfGuess}`;
userInput.removeAttribute('disabled');
startOver.removeChild(p);
   playGame=true;

   }
        


   )}
