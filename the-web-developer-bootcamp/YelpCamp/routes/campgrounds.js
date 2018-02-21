var express= require("express");
var router = express.Router();
var Campground = require("../models/campground");
// ===========================
// Campgrounds routes
// ===========================

//INDEX - show all campgrounds
router.get("/", function(req, res){

  Campground.find({},function(err,foundCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: foundCampgrounds});
    }
  });

});

//CREATE - create a new campground
router.post("/", isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name:name, image: image, description: description, author: author };
  Campground.create(newCampground, function(err, newCampground){
    if(err){
      console.log(err);
    }else{
      console.log("Added campground to the database");
      console.log(newCampground);
    }
  });
  console.log(newCampground);
  res.redirect("/campgrounds");
});

//NEW - Page that show from to create a new campground
router.get("/new", isLoggedIn, function(req,res){
  res.render("campgrounds/new");
});

//SHOW - Page that shows detailed info about a specific campground
router.get("/:id", function(req,res){
  
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/show", {campground: campground});
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;