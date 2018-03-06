var express= require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
// ===========================
// Comments routes
// ===========================

// NEW - creates a new comment inside a specific campground
router.get("/new", middleware.isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
        res.render("comments/new", {campground: foundCampground});
    }
  });
});

// CREATE - create a new comment inside a specific campground
router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        Comment.create(req.body.comment, function(err,newComment){
          if(err){
            req.flash("error", "Something went wrong!!");
            console.log(err);
          }else{
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.username;
            newComment.save();
            // There some issues with mongoose to push comments: see https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/3454522
            foundCampground.comments.push(newComment._id);
            foundCampground.save();
            req.flash("success", "The comment has been added");
            res.redirect("/campgrounds/" + foundCampground._id);
          }
        });
      }
  });
});

//EDIT - Page that shows form to edit an existing comment
router.get("/:comment_id/edit", middleware.changeCommentAuth, function (req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    }else{
      console.log(foundComment);
      res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
    }
  });
});
//UPDATE - Update an existing comment
router.put("/:comment_id", middleware.changeCommentAuth, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if (err){
      res.redirect("back");
    }else{
      req.flash("success", "Comment updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
//DESTROY - Delete an existing comment
router.delete("/:comment_id", middleware.changeCommentAuth, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
