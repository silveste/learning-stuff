console.log("Print all numbers between -10 and 19");
for(var num = -10; num <= 19; num++){
  console.log(num);
}

console.log("Print all even numbers between 10 and 40");
for (var num = 10; num <= 40; num +=2){
    console.log(num);
}

console.log("Print all odd numbers between 300 and 333");
for (var num = 301; num <= 333; num +=2){
    console.log(num);
}

console.log("Print all numbers divisible by 5 and 3 between 5 and 50");
for (var num = 5; num <= 50; num++){
  if (num % 3 === 0 && num % 5 === 0 ){
    console.log(num);
  }
}
