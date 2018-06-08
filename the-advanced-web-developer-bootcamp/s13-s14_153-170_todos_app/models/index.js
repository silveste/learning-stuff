var mongoose = require('mongoose');
mongoose.set('debug',true); // Set mode debug allow us to see what happens at any moment
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise; //Allows to use promise syntax rather than use a callback function

module.exports.Todo = require("./todo");
