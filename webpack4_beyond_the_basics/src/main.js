//requires two loaders css-loader to lint the file and style-loader
//to insert the code in the html
require("./main.css");
//Requires html-loader, extract-loader and file-loader
require("./index.html");

/*Setting Up Babel*/
//Not all browsers support arrow functions, however babel will transpile for old browsers
//babel-plugin-transform-es2015-arrow-functions plugin is required to make the following
//code work accross old browsers
var a = () => {
  console.log("Hello from an arrow function");
}
a();
