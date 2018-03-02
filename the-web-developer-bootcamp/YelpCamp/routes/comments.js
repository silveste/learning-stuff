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

//EDIT - Page that shows form to edit an existing comment
router.get("/:comment_id/edit", changeCommentAuth, function (req, res){
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
router.put("/:comment_id", changeCommentAuth, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if (err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
//DESTROY - Delete an existing comment
router.delete("/:comment_id", changeCommentAuth, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

function changeCommentAuth (req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err){
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)){
          next();
        } else {
            res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;
