var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
  res.render("landing");
});

// ===========================
// Auth routes
// ===========================

// SHOW NEW - show register form
router.get("/register", function(req,res){
  res.render("users/register");
});

// CREATE NEW - creates a new username
router.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req,res, function(){
        req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect("/campgrounds");
      });
    }
  });
});

//SHOW LOGIN - show login form
router.get("/login", function(req, res){
  res.render("users/login");
});

//AUTHENTICATE USER
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});

//LOGOUT
router.get("/logout", function(req,res){
  var name = req.user.username;
  req.logout();
  req.flash("success", "Bye, " + name);
  res.redirect("/campgrounds");
});

module.exports = router;
