/* global require */
/*Dev section*/
var faker =require("faker");
/*End dev section*/
var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [];
  while (campgrounds.length < 5){
    var campground = {
      name: faker.commerce.productName(),
      image: faker.image.image()
    };
    campgrounds.push(campground);
  }
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
  console.log("YelpCamp server running on http://localhost:3000");
});
