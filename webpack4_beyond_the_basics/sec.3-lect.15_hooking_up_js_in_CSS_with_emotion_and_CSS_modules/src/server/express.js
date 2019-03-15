import express from "express";
import path from "path";

const server = express();

const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);


//Configuring Webpack
const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  //devServer property is inside webpack.de.js
  config.devServer
);

//webpack-hot-middleware recompile and automatically update the browser when saving a file
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

//Express will use webpack middle ware and hot middleware to reload on changes
//The order is important here. Allways webpack hot middleware before dev middleware
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

//Configuring directory to serve static pages
const staticMiddleware = express.static("dist");

server.use(staticMiddleware);

server.listen(8080, () => {
  console.log("Server ready");
});

//Note that this code is quite similar that the code of webpack-dev-server
