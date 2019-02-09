//babel runtime regenerator allows transforming the code for older browsers
require("babel-runtime/regenerator");
//requires two loaders css-loader to lint the file and style-loader
//to insert the code in the html
require("./main.css");
//Requires html-loader, extract-loader and file-loader
require("./index.html");

/*Setting Up Babel*/
//Not all browsers support arrow functions, however babel will transpile for old browsers
//babel-plugin-transform-es2015-arrow-functions plugin is required to make the following
//code work accross old browsers
var a = async (args) => {
  const {a, b} = args
  await console.log("Hello from an arrow function",a ,b);
  console.log("Done");
}
a({a: 1, b: 2});
