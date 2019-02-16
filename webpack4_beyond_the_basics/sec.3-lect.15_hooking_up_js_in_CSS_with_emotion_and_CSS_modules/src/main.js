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
//Requires html-loader, extract-loader and file-loader
require("./index.html");

require('./app');
