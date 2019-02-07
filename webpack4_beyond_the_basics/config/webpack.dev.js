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
    contentBase: "dist"
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
      }
    ]
  }
}
