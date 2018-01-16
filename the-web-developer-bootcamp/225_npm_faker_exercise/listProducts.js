/* global require */

var fake = require('faker');

for(var i = 0; i < 10; i++){
  var textLine = 'Product: ' + fake.commerce.productName() + ', Price: ' + fake.commerce.price();
  console.log(textLine);
}
