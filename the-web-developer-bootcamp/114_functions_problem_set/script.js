console.log("Connected");
console.log("Use the console to call the functions");
console.log("isEven(Number)");
console.log("factorial(Number)");
console.log("kebabToSnake(String)");
function isEven(num){
//  MY VERSION:
//  var reminder = num % 2;
//  if (reminder === 0) {
//    return true;
//  }
//  return false;
//  PROPER VERSION
  return num % 2 === 0;
}

function factorial(num){
  var result = 1;
  while (num > 1){
    result *= num;
    num--;
  }
  return result;
}

function kebabToSnake(text){
  var result = text.replace(/-/g, "_");
  return result;
}
