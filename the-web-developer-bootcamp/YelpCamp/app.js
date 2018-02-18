/*jslint node: true */
"use strict";


/* CONFIG SECTION ------------------------------------------------------------*/
// required packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//Using body-parser to parse post requests
app.use(bodyParser.urlencoded({extended: true}));

//Set public directory to server assests
app.use(express.static(__dirname + "/public"));

//Set ejs as default template egine, avoiding write extension when call files
app.set("view engine", "ejs");

// Passport configuration
app.use(require("express-session")({
  secret: "Que tengo que tengo que tengo de tooo!!!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Adding user to all routes
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});
//Conecting database
mongoose.connect("mongodb://localhost/yelpcamp");

//Seeding database for testing purposes
seedDB();

/*END CONFIG SECTION ---------------------------------------------------------*/



app.get("/", function(req, res){
  res.render("landing");
});

// ===========================
// Campgrounds routes
// ===========================

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){

  Campground.find({},function(err,foundCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: foundCampgrounds});
    }
  });

});

//CREATE - create a new campground
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

//NEW - Page that show from to create a new campground
app.get("/campgrounds/new", function(req,res){
  res.render("campgrounds/new");
});

//SHOW - Page that shows detailed info about a specific campground
app.get("/campgrounds/:id", function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/show", {campground: campground});
    }
  });
});

// ===========================
// Comments routes
// ===========================

// NEW - creates a new comment inside a specific campground
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
        res.render("comments/new", {campground: foundCampground});
    }
  });
});

// CREATE - create a new comment inside a specific campground
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        Comment.create(req.body.comment, function(err,newComment){
          if(err){
            console.log(err);
          }else{
            foundCampground.comments.push(newComment);
            foundCampground.save(err, function(){
              if(err){
                console.log(err);
              }else{
                res.redirect("/campgrounds/" + foundCampground._id);
              }
            });
          }
        });
      }
  });
});

// ===========================
// Auth routes
// ===========================

// SHOW NEW - show register form
app.get("/register", function(req,res){
  res.render("users/register");
});

// CREATE NEW - creates a new username
app.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      console.log(err);
      res.render("user/register");
    }else{
      passport.authenticate("local")(req,res, function(){
        res.redirect("/campgrounds");
      });
    }
  });
});

//SHOW LOGIN - show login form
app.get("/login", function(req, res){
  res.render("users/login");
});

//AUTHENTICATE USER
app.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});

//LOGOUT
app.get("/logout", function(req,res){
  req.logout();
  res.redirect("/campgrounds");
});

// ===========================
// Auth middleware
// ===========================

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

// Listener C9
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("YelpCamp server running on https://" + process.env.C9_HOSTNAME);
// });
// Listener local computer
app.listen(3000, function(){
  console.log("YelpCamp server running on http://localhost:3000");
});
