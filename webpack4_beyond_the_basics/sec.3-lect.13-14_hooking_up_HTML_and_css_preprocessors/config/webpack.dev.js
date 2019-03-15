const path = require("path"); //package that comes with node
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin"); //used to reload  browser when changes in HTML file

module.exports = {
  entry : {
    //Paths in the entry are relative to where webpack is run from,
    //therefore in this case webpack must be executed in ../src
    //main key can also point to an array of different files and webpack
    //will concatenate then togheter i.e. main: ["./src/first.js", "./src/second.js"]
    //core-js/fn/promise library includes polyfill only for promises. If you want to
    //change for all polyfills include babel-polyfill instead
    //The polyfill code will only be ran if is not included natively in the browser
    main: [/*"core-js/fn/promise",*/"./src/main.js"]
  },
  mode: "development",
  output: {
    //[name] points to the key inside entry object, in this case [name] = main
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    //publicPath indicates the path of the bundle.js that will appear in the browser
    //is the path that is indicated in the html and tells the browser where to find
    //the js file
    publicPath: "/"
  },
  //config for web-dev-server
  devServer: {
    //wen running webpack-dev-server everything in dist folder will be served
    contentBase: "dist",
    //To see any error in the browser overlay: true
    //note that by the default webpack shows errors only in the console or the
    //terminal where webpack-dev-server is executed
    overlay: true,
    //hot: true =>To reload and update the web browser on changes (Not necesary for webpack-dev-server,
    //only when including webpack hot server into frameworks such as express)
    hot: true,
    //To see colors in the console output
    stats: {
      colors: true
    }
  },
  //source-map allows devtools to show the real code when debugging not the compiled by wbepack
  devtool: "source-map",
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
            loader: "style-loader"
          },
          {
            //loader responsible for linting the file
            loader: "css-loader"
          }
        ]
      },
      //Loader for sass
      {
        test: /\.sass$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          //post-css loader automatically inser autoprefixes to get compaibility across all browsers
          /*{
            loader: "postcss-loader"
          },*/
          //sass loader
          {
            loader: "sass-loader"
          }
        ]
      },
      //Loader for less
      {
        test: /\.less/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          //post-css loader automatically inser autoprefixes to get compaibility across all browsers
          /*{
            loader: "postcss-loader"
          },*/
          //less loader
          {
            loader: "less-loader"
          }
        ]
      },
      //Loader for stylus
      {
        test: /\.styl/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          //post-css loader automatically inser autoprefixes to get compaibility across all browsers
          {
            loader: "postcss-loader"
          },
          //stylus loader
          {
            loader: "stylus-loader"
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
      },
      {
        //Loader for pug files
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader"
          }
        ]
      },
      {
        //Loader for hbs files
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            query: {
              inlineRequires: "/images/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //Includes webpack-hot-middleware to reload page on changes,
    //note require webpack at the beginning of the file
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    //html-webpack-plugin allows hot reloading when changin html
    //file. used with nodemon (which reload server side)
    new HTMLWebpackPlugin ({
      //Load ejs file
      //template: "./src/index.ejs",
      //load pug file
      //template: "./src/index.pug",
      //load hbs file
      template: "./src/index.hbs",
      //The following parameter is passed to the ejs file as a variable
      title: "Link's journal"
    })
  ]
}
