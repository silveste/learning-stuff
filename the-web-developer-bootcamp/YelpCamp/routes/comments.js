var express= require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// ===========================
// Comments routes
// ===========================

// NEW - creates a new comment inside a specific campground
router.get("/new", isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
        res.render("comments/new", {campground: foundCampground});
    }
  });
});

// CREATE - create a new comment inside a specific campground
router.post("/", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        Comment.create(req.body.comment, function(err,newComment){
          if(err){
            console.log(err);
          }else{
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.username;
            newComment.save();
            // There some issues with mongoose to push comments: see https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/3454522
            foundCampground.comments.push(newComment._id);
            foundCampground.save();
            res.redirect("/campgrounds/" + foundCampground._id);
          }
        });
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