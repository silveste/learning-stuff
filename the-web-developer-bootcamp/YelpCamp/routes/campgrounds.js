var express= require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
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
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name:name, price: price, image: image, description: description, author: author };
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

//NEW - Page that show form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
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

//EDIT - Page that shows form to edit an existing campground
router.get("/:id/edit", middleware.changeCampgroundAuth, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
      if (err){
        console.log(err);
      } else {
          res.render("campgrounds/edit", {campground: foundCampground});
      }
    });
});
//UPDATE - Update an existing campground
router.put("/:id", middleware.changeCampgroundAuth, function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err){
    if (err){
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY - Delete an existing campgrounds
router.delete("/:id", middleware.changeCampgroundAuth, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    }else {
      req.flash("success", "Campground deleted");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
