function printReverse(data){
  for ( var i = data.length - 1; i >= 0; i--){
    console.log(data[i]);
  }
}

function isUniform(data){
  var checker = data[0];
  for(var i = 1; i < data.length; i++){
    if (checker !== data[i]){
      return false;
    }
  }
  return true;
}

function sumArray(data){ //It asumes all values are numbers
  var sum = 0;
  data.forEach(function (each){
    sum += each;
  })
  return sum;
}

function max(data){ //It assumes all values are numbers
  var biggest;
  data.forEach(function (each){
    if (biggest < each || biggest === undefined){
      console.log("inside forEach");
      biggest = each;
      console.log("Each =" + each);
      console.log("biggest =" + biggest);
    }
  })
  return biggest;
}
