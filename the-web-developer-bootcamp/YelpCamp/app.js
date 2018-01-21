/*jslint node: true */
"use strict";
/*Dev section*/
var faker =require("faker");
var campgrounds = [];
while (campgrounds.length < 5){
  var campground = {
    name: faker.commerce.productName(),
    image: faker.image.image()
  };
  campgrounds.push(campground);
}
/*End dev section*/
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
  res.render("new");
});

app.listen(3000, function(){
  console.log("YelpCamp server running on http://localhost:3000");
});
