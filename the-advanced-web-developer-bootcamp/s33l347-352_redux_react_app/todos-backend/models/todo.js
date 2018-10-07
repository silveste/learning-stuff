const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos-backend');

//Show mongo queries for debuggin purposes
mongoose.set('debug', true);

//To ensure mongoose uses ES2015 library
mongoose.Promise = Promise;

const todoSchema = new mongoose.Schema({
  task: String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
