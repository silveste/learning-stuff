/*jslint node: true */
"use strict";

/*DEV SECTION ----------------------------------------------------------------*/
var faker =require("faker");
function fakeCampground (){
  return {
    name: faker.commerce.productName(),
    image: faker.image.image(),
    description: faker.lorem.paragraph()
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
  image: String,
  description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);
/*END CONFIG SECTION ---------------------------------------------------------*/

/*TESTING ---------------------------------------------------------*/
//Creating a minimum of 10 items in the DB
Campground.find({}, function(err, campgrounds){
  if(err){
    console.log(err)
    return -1;
  } else {
    console.log("Setting campgrounds to a minimum of 10 for testing puposes");
    console.log("Initial campgrounds:" + campgrounds.length);
    for (var i = campgrounds.length; i < 10; i++) {
      Campground.create(fakeCampground(), function (err, campground){
        if(err){
          console.log(err);
        } else {
          console.log("New campground created");
          console.log(campground);
        }
      });
    }
  }
});

/*END TESTING ---------------------------------------------------------*/

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

//INDEX - show all campgrounds
app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name:name, image: image, description: description };
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

//NEW - Page that creates a new campground
app.get("/campgrounds/new", function(req,res){
  res.render("new");
});

//SHOW - Page that shows detailed info about a campground
app.get("/campgrounds/:id", function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {campground: campground});
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("YelpCamp server running on https://" + process.env.C9_HOSTNAME);
});
