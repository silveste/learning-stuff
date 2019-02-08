const path = require("path") //package that comes with node

module.exports = {
  entry : {
    //Paths in the entry are relative to where webpack is run from,
    //therefore in this case webpack must be executed in ../src
    //main key can also point to an array of different files and webpack
    //will concatenate then togheter i.e. main: ["./src/first.js", "./src/second.js"]
    main: "./src/main.js"
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
    overlay: true
  },
  module: {
    //Rules that webpack will use when encounter with a file with different
    //language than js
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
      {
        test: /\.html$/,
        //Loaders in use array are executed in inverse order
        use: [
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
          },
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
      }
    ]
  }
}
