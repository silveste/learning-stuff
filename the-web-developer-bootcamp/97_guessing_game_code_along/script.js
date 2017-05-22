// Number to guess
var num = 7;

// Ask the user for a number

var guess = Number(prompt("Guess the number"));

//Check if is the same
if (num === guess){
  alert ("Congratulations!! You got the number!");
}
// if not, check if is higher
else if (num < guess){
  alert("The number is too high");
}
// if not, check if is too low
else if (num > guess){
  alert("The number is too low");
}
//if not, is not a number
else {
  alert("Write only a number, don't cheat");
}
