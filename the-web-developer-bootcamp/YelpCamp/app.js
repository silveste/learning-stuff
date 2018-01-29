/*jslint node: true */
"use strict";

/*DEV SECTION ----------------------------------------------------------------*/
var faker =require("faker");
function fakeCampground (){
  return {
    name: faker.commerce.productName(),
    image: faker.image.image()
  };
}

/*END DEV SECTION ------------------------------------------------------------*/


/* CONFIG SECTION ------------------------------------------------------------*/
// required packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

//Using body-parser to parse post requests
app.use(bodyParser.urlencoded({extended: true}));

//Set ejs as default template egine, avoiding write extension when call files
app.set("view engine", "ejs");

//Conecting database
mongoose.connect("mongodb://localhost/yelpcamp");

//Schemas
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);
/*END CONFIG SECTION ---------------------------------------------------------*/

/*
//Creating fake campgrounds
Campground.create(fakeCampground(), function (err, campground){
  if(err){
    console.log(err);
  } else {
    console.log("New campground created");
    console.log(campground);
  }
});
*/

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  
  Campground.find({},function(err,foundCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index", {campgrounds: foundCampgrounds});
    }
  });
  
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image: image};
  Campground.create(newCampground, function(err, newCampground){
    if(err){
      console.log(err);
    }else{
      console.log("Added campground to the database");
      console.log(newCampground);
    }
  });
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
  res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("YelpCamp server running on https://" + process.env.C9_HOSTNAME);
});
