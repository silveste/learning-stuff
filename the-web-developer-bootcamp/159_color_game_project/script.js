//Global variables
var hidenColor;
var modeHard = true;
// End global variables

// Listeners
var squares = document.querySelectorAll(".square");
for (var i = 0; i < squares.length; i++){
  squares[i].addEventListener("click", checkColor);
}
document.getElementById("new-colors").addEventListener("click", init);
document.getElementById("easy").addEventListener("click", function(){
  if (modeHard){
    toggleMode();
  }
});
document.getElementById("hard").addEventListener("click", function(){
  if (!modeHard){
    toggleMode();
  }
});
// End Listeners

init(); // Initialize the app

// Functions

// Set the page for a new game
function init(){
  var colors = [];
  //Reset the page
  showMsg(""); //wipe any message
  document.querySelector("#head").style.backgroundColor = "steelblue";//Remove head background color
  document.getElementById("new-colors").textContent = "New Colors";

  // Colors to guess are different depending on game mode
  colors = setColors(modeHard ? 6:3);

  //pick a random color from colors
  var rndPos = Math.floor(Math.random() * colors.length);
  hidenColor = colors[rndPos];
  document.getElementById("to-guess").textContent = hidenColor;
}

// return an array with the random colors and show in the boxes background
function setColors(numOfColors){
  var colors = [];
  for ( var i = 0; i < numOfColors; i++){
    var color = "rgb(" + getRandomByte() + ", " + getRandomByte() + ", " + getRandomByte() + ")";
    colors.push(color);
    squares[i].style.backgroundColor = colors[i];
  }
  return colors;
}

function checkColor(){
  var color = this.style.backgroundColor;
  if(color === hidenColor){
    showMsg("Correct!");
    document.getElementById("new-colors").textContent = "Play Again?";
    document.querySelector("#head").style.backgroundColor = hidenColor;
    for (var i = 0; i < squares.length; i++){
      squares[i].style.backgroundColor = hidenColor;
    }
  }
  else {
    showMsg("Try Again");
    this.style.backgroundColor = document.querySelector("body").style.backgroundColor;
  }
}

function toggleMode(){
  modeHard = !modeHard;
  document.getElementById("hard").classList.toggle("selected");
  document.getElementById("easy").classList.toggle("selected");
  for (var j = 3;  j < squares.length; j++ ){
    squares[j].classList.toggle("hidden");
  }
  init();
}

function getRandomByte(){
  return Math.floor(Math.random()*256);
}

function showMsg(message){
  var board = document.querySelector(".messages");
  board.textContent = message;
}

//End functions
