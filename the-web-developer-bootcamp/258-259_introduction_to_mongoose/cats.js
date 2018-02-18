var mongoose = require("mongoose");
var faker = require("faker");
    
// Connect to the database server
mongoose.connect("mongodb://localhost/cat_app");

// Adding record schema (structure)
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//Compiling the schema into a model
var Cat = mongoose.model("Cat", catSchema);

// Creating a new instance of the model
var newCat = new Cat({
    name: faker.name.firstName(),
    age: Math.round(Math.random()*20),
    temperament: faker.lorem.word()
});
// console.log("waiting 5 seconds"); 
// setTimeout(function(){ // Added to allow disconect database and see what happens
//     newCat.save(function(err, cat){
//         if(err){
//             console.log("Something went wrong, I couldn't save into the DB");
//         } else {
//          console.log("The cat is save at home!!");
//           console.log(cat);
//      }
//     })
// }, 5000);

console.log("waiting 5 seconds"); 
setTimeout(function(){ // Added to allow disconect database and see what happens
    Cat.find(function(err, cats){
      if(err){
        console.log("Ups! Something is wrong, I can't find anything");
        console.log(err);
        console.log("I want to check if  printing err variable closes the program, if so, we shouldn't see this message")
      } else {
        console.log("I found these:");
        console.log(cats);
        console.log("Closing Node in 2 seconds"); //message will be printed before cats will be retrieved
        setTimeout(function(){process.exit()}, 2000); //Needs to wait untill console.log(cats) finish
      }
    });
    
}, 5000);
