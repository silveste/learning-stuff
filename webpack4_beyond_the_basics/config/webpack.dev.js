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
  devServer: {
    //wen running webpack-dev-server everything in dist folder will be served
    contentBase: "dist"
  }
}
