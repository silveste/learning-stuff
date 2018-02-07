var 
faker       = require("faker"),
mongoose    = require("mongoose"),
Campground  = require("./models/campground"),
Comment     = require("./models/comment");

function seedDB() {
    Campground.remove({}, function(err){
        if(err){
            console.log("Error removing campgrounds");
        } else {
            console.log("All former campgrounds have been removed from database");
            Comment.remove({}, function(err){
                if(err){
                    console.log("Error removing campgrounds");
                } else {
                    console.log("All former comments have been removed from database");
                    initialCampgrounds(5);
                }
            });
        }
    });
}

module.exports = seedDB; 

/*FAKE CAMPGROUNDS ----------------------------------------------------------------*/
function fakeCampground (){
    return {
        name: faker.commerce.productName(),
        image: faker.image.nature(),
        description: faker.lorem.paragraph()
    };
}
function fakeComment(){
    return {
        text: faker.lorem.paragraph(),
        author: faker.name.firstName()
    };
}
function initialCampgrounds(number){
    console.log("Creating " + number + " new campgrounds");
    for (var i = 0; i < number; i++) {
      Campground.create(fakeCampground(), function (err, campground){
        if(err){
          console.log("Error creating campgrounds");
        } else {
          Comment.create(fakeComment(), function (err, comment){
               if(err){
                   console.log("Can't create a comment inside " + campground.name);
               }else{
                   campground.comments.push(comment._id);
                   campground.save(function(err){
                       if(err){
                           console.log(err);
                       } else {
                           console.log("New campground: " + campground.name);
                           console.log("with " + comment.author + " comment");
                       }
                   });
               }   
          });
        }
      });
    }
}
/*End fake crea ------------------------------------------------------------*/

