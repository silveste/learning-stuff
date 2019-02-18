import express from "express";
import path from "path";

const server = express();

const isProd = process.env.NODE_ENV ==='production';

if (!isProd){
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
  console.log("Middleware enabled");
}

//Configuring directory to serve static pages
const staticMiddleware = express.static("dist");
server.use(staticMiddleware);

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

//Note that this code is quite similar that the code of webpack-dev-server
