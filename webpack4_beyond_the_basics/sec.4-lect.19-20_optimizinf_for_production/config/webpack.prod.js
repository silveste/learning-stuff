//Webpack prod is for production, see package.json scripts

//Diference from loaders and plugins is mainly that a loder affects
//one file at a time while the plugin affects the whole bundle

const path = require("path"); //package that comes with node
const webpack = require("webpack");
//html-webpack-plugin is used to reload  browser when changes in HTML file
const HTMLWebpackPlugin = require("html-webpack-plugin");
//mini-css-extract-plugin plugin extracts CSS into separate files.
//Useful in production as sometimes for slow networks
//the styles are not applyed inmediatly due that is waiting untill webpack
//script is completely loaded.
//In this specific case it might be better to load the styles in a separate file
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
//optimize-css-assets-webpack-plugin reduce css size
//by eleminiting duplicates etc.
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isProd = process.env.NODE_ENV === "production"

//By returning a function instead an object we can pass variables into
//the object that the function returns. In this case we can pass
//the env variable NODE_ENV
module.exports = env  => {
  return {
    entry : {
      //Paths in the entry are relative to where webpack is run from,
      //therefore in this case webpack must be executed in ../src
      //main key can also point to an array of different files and webpack
      //will concatenate then togheter i.e. main: ["./src/first.js", "./src/second.js"]
      //core-js/fn/promise library includes polyfill only for promises. If you want to
      //change for all polyfills include babel-polyfill instead
      //The polyfill code will only be ran if is not included natively in the browser
      main: [/*"core-js/fn/promise",*/
        "babel-runtime/regenerator", //see main.js file for more inf about babel
        "webpack-hot-middleware/client?reload=true", //see main.js file for more inf about webpack-hot-middleware
        "./src/main.js"
      ]
    },
    mode: "production",
    output: {
      //[name] points to the key inside entry object, in this case [name] = main
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../dist"),
      //publicPath indicates the path of the bundle.js that will appear in the browser
      //is the path that is indicated in the html and tells the browser where to find
      //the js file
      publicPath: "/"
    },
    module: {
      //Rules that webpack will use when encounter with a file with different
      //language than js. it also can have rules for js files, i.e. use babel to transpile
      //a js file to ES2015
      rules: [
        {
          //test parameter points to a regex that catch the file(s) target
          test: /\.css$/,
          //use parameter points to an array with the loaders that will manage
          //the language contained in the files
          //webpack will run the loaders in inverse order, in this case css-loader
          //first and style-loader second
          use: [
            {
              //loader responsible to inject the css into the html
              loader: MiniCSSExtractPlugin.loader
            },
            {
              //loader responsible for linting the file
              loader: "css-loader",
              options: {
                //minimize not working with this css-loader version
                //it suposse that minimize the css making the file smaller
                //better solution is using optimize-css-assets-webpack-plugin
                //minimize: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          //Loaders in use array are executed in inverse order
          use: [
            /* File and extract loader has been replaced by html-webpack-plugin, see at the botton (plugins section)
            {
              //loader responsible for create a file. In this case we need to create a file
              //as we want the file separated from the main-bundle.js
              loader: "file-loader",
              options: {
                //name indicates how is going to be the file name in the output
                //[name] = name of the original file, therefore the name won change in this case
                name: "[name].html"
              }
            },
            {
              //loader responsible to tell webpack that the file will be a separate file
              //not  included in the main-bundle.js
              loader: "extract-loader"
            },*/
            {
              //loader responsible for parsing (linting) the html file
              loader: "html-loader",
              options: {
                //Targeting src attribute in img elements, this option indicates
                //that webpack will provide whatever is in the src for all img elements
                //there should be an image in the path the the source html indicates
                attrs: ["img:src"]
              }
            }
          ]
        },
        {
          //loader for imges
          //regex that captures jpg or gif or png
          test: /\.(jpg|gif|png)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                //All images will be set in images path with the original name and extension and
                //a hash between them
                name: "images/[name]-[hash:8].[ext]"
              }
            }
          ]
        },
        {
          //Catching js to transpile to es2015
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader"
            }
          ],
          //Exclude js in node_modules folder
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new OptimizeCSSAssetsPlugin(),
      new MiniCSSExtractPlugin({
        filename: "[name]-[contenthash].css"
      }),

      new HTMLWebpackPlugin ({
        //Load ejs file
        template: "./src/index.ejs",
        //inject: true,
        //load pug file
        //template: "./src/index.pug",
        //load hbs file
        //template: "./src/index.hbs",
        //The following parameter is passed to the ejs file as a variable
        title: "Link's journal"
      }),
      //We can define a new plugin that allows to specify env variables
      new webpack.DefinePlugin({
        'process.env': {
          'WEBPACK_FILE': JSON.stringify('webpack.prod.js'),
          'NODE_ENV': JSON.stringify(env.NODE_ENV)
        }
      })
    ]
  }
  }
