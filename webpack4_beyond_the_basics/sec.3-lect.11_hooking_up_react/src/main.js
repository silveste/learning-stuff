//babel runtime regenerator allows transforming the code for older browsers
require("babel-runtime/regenerator");
//Hot loader allows to load on changes whithout loosing the state
require('react-hot-loader/patch');
//Require babel library to get ES6 working
require("babel-register");
//webpack-hot-middleware/client provides the neccesary js code to set the websocket
//connection, allowing webpack to reload the webserver on changes
//reload=true allows html-webpack-plugin to reload when changing the HTML
require("webpack-hot-middleware/client?reload=true");
//requires two loaders css-loader to lint the file and style-loader
//to insert the code in the html
require("./main.css");
//Requires html-loader, extract-loader and file-loader
require("./index.html");

require('./app');

/*Setting Up Babel*/
//Not all browsers support arrow functions, however babel will transpile for old browsers
//babel-plugin-transform-es2015-arrow-functions plugin is required to make the following
//code work accross old browsers
/*
var a = async (args) => {
  const {a, b} = args
  await console.log("Hello from an arrow function",a ,b);
  console.log("Done");
}
a({a: 1, b: 2});
*/
