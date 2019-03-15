//babel runtime regenerator allows transforming the code for older browsers
//require("babel-runtime/regenerator");
//webpack-hot-middleware/client provides the neccesary js code to set the websocket
//connection, allowing webpack to reload the webserver on changes
//reload=true allows html-webpack-plugin to reload when changing the HTML
//require("webpack-hot-middleware/client?reload=true");
//requires two loaders css-loader to lint the file and style-loader
//to insert the code in the html
require("./main.css");
require("./nav.css");
//Requires html-loader, extract-loader and file-loader
require("./index.html");

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
console.log(`Envoironment is ${process.env.NODE_ENV}\nWebpack file: ${process.env.WEBPACK_FILE}`);

/*
IMPORTANT
All comments aren't neccessary, I left them there for learning purposes
however all requires included in this file can be added in webpack config file as
part of entry: { main: []} array therefore some of the lines commented here are
being required in the respective webpackfile
As a rule of thumb we can use that files for the common required both in dev in
production and use the webpack files to set up the configs that are different
for example babel is used only in dev webpack file
*/
