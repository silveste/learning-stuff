var age = prompt("How old are you?");

if(age < 0){
  console.log("Your age cannot be negative");
}
if ( age == 21){ // We need type coercion as age could be an string
  console.log("Happy 21st birthday");
}
if ( age % 2 !== 0)  {
  console.log("Your age is odd");
}
if ( age > 0 && Math.sqrt(age) % 1 === 0)  {
  console.log("Perfect square");
}


