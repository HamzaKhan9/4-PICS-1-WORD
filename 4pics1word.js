// GLOBAL VARIABLES
let guessedWordArray = [];
let givenLettersArray = [];
let renderLettersArray = [];
let mainWord = "DRINK";

// FUNCTIONS OF THE GAME
function gameButtonAlphabets(str) {
  for (let i = 0; i < str.length; i++) {
    givenLettersArray.push(str[i]);
  }
  for (let i = str.length; i < 12; i++) {
    let num = Math.floor(Math.random() * (90 - 65 + 1) + 65);
    //console.log(num);
    let char = String.fromCharCode(num);
    givenLettersArray.push(char);
  }
  return givenLettersArray;
}
function mixing(arr) {
  let deckShrinklength = arr.length;
  let mixedGivenLettersArray = [];
  let cardsToMix = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let randomNum = Math.random() * (deckShrinklength - 0) + 0;
    mixedGivenLettersArray.push(cardsToMix.splice(randomNum, 1)[0]);
    deckShrinklength--;
  }
  return mixedGivenLettersArray;
}
function wordChecker(orignalStr, inuptStr) {
  if (inuptStr.toUpperCase() === orignalStr.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}
function hintlettersVanish(arr) {
  for (let i = 0; i < 2; i++) {
    let index = Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
    let char = arr[index];
    while (mainWord.includes(char, 0) === true) {
      index = Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
      char = arr[index];
    }
    console.log(char);
    arr[index] = "";
  }
  return arr;
}
function hintCharacterTeller(str) {
  let index = Math.floor(Math.random() * (str.length - 1 - 0 + 1) + 0);
  let char = str[index];
  return char;
}
function renderStartingScreen() {
  let wordArea = document.getElementById("guessWord");
  let givenLetters = document.getElementById("givenLetters");
  for (let i = 0; i < mainWord.length; i++) {
    wordArea.innerHTML =
      wordArea.innerHTML + `<div class='buttons-div' id="letterNo${i}"></div>`;
  }
  for (let i = 0; i < 12; i++) {
    givenLetters.innerHTML =
      givenLetters.innerHTML +
      `<div class='buttons-div' id='button-div${i}' style = "background-color: transparent"></div>`;
  }
  for (let i = 0; i < mainWord.length; i++) {
    guessedWordArray.push("");
  }
}
function renderLetters(arr) {
  for (let i = 0; i < 12; i++) {
    let id = document.getElementById(`button-div${i}`);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "button");
    x.setAttribute("value", `${arr[i]}`);
    x.setAttribute("class", "letter-buttons");
    x.setAttribute("id", `button${i}`);
    x.setAttribute("onclick", `givenLetterToGuessWord(${i})`);
    id.appendChild(x);
  }
}
function givenLetterToGuessWord(num) {
  let char = document.getElementById(`button${num}`);
  char.style.display = "none";
  givenLettersArray[num] = "";
  console.log(givenLettersArray);
  let i = 0;
  while (guessedWordArray[i] !== "") {
    i++;
  }
  let charShow = document.getElementById(`letterNo${i}`);
  let x = document.createElement("INPUT");
  x.setAttribute("type", "button");
  x.setAttribute("value", `${renderLettersArray[num]}`);
  x.setAttribute("class", "letter-buttons");
  x.setAttribute("id", `shiftedButton${num}`);
  x.setAttribute("onclick", `removeGuessLetter(${num} , ${i})`);
  charShow.appendChild(x);
  guessedWordArray[i] = x.value;
  console.log(guessedWordArray);
  if (wordChecker(guessedWordArray.join(""), mainWord) === true) {
    document.getElementById("nextRound").style.display = "block";
  }
}
function removeGuessLetter(indexOfGivenLetters, index) {
  let char = document.getElementById(`shiftedButton${indexOfGivenLetters}`);
  char.remove();
  document.getElementById(`button${indexOfGivenLetters}`).style.display =
    "block";
  guessedWordArray[index] = "";
  console.log(guessedWordArray);
}
function hintlettersVanishButtonClicked() {
  let arr = hintlettersVanish(givenLettersArray);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      document.getElementById(`button${i}`).style.display = "none";
    }
  }
  console.log(givenLettersArray);
}

givenLettersArray = mixing(gameButtonAlphabets(mainWord));
renderLettersArray = [...givenLettersArray];
renderStartingScreen();
renderLetters(renderLettersArray);
