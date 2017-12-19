console.log("App started");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

/*Array to test app*/
var friends = ["Michelle", "Leah", "Carmen", "Cora", "Andrew"];

app.set("view engine", "ejs");

app.get ("/", function (req, res){
  res.render("home");
});
app.get("/friends", function(req, res){
  res.render("friends", {friends: friends});
});
app.post("/addfriend", function(req, res){
  console.log("Request body for POST:");
  console.log(req.body);
  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect("/friends");
});
app.listen(3000, function(){
  console.log("Server started");
});
