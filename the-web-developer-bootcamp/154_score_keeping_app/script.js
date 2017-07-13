// Store DOM elements into variables
var p1ScoreButton = document.getElementById("player1-button");
var p2ScoreButton = document.getElementById("player2-button");
var resetButton = document.getElementById("reset");
var p1ScoreSpan = document.getElementById("player1-score");
var p2ScoreSpan = document.getElementById("player2-score");
var maxScoreInput = document.getElementById("max-score");

//Variables used for the logic
var p1Score = 0;
var p2Score = 0;
var maxScore = Number(maxScoreInput.value);
var playing = true;


// Listener player 1
p1ScoreButton.addEventListener("click", function(){
  if (playing){
    p1Score++;
    p1ScoreSpan.textContent = p1Score;
    if(p1Score === maxScore){
      p1ScoreSpan.classList.add("green");
      playing = false;
    }
  }
});


// Listener player 2
p2ScoreButton.addEventListener("click", function(){
  if (playing){
    p2Score++;
    p2ScoreSpan.textContent = p2Score;
    if(p2Score === maxScore){
      p2ScoreSpan.classList.add("green");
      playing = false;
    }
}
});


// Listener reset
resetButton.addEventListener("click", reset);

// Input listener
maxScoreInput.addEventListener("change", function(){
  // The value cannot be negative or 0
  if (Number(maxScoreInput.value) <= 0){
    alert("Value cannot be smaller than 1");
    maxScoreInput.value = maxScore;
    return;
  }
  // If the user change the number by mistake the system will alert
  if (p1Score + p2Score !== 0 && !window.confirm("To change the Maximum Score the game will be reseted")){
    maxScoreInput.value = maxScore;
    return;
  }
  reset();
});

function reset(){
  p1Score = 0;
  p2Score = 0;
  p1ScoreSpan.textContent = p1Score;
  p2ScoreSpan.textContent = p2Score;
  p1ScoreSpan.classList.remove("green");
  p2ScoreSpan.classList.remove("green");
  maxScore = Number(maxScoreInput.value);
  playing = true;
}
