var express = require('express');
var router = express.Router();
var db = require('../models'); //By requiring the directory NodeJS automatically get index.js in the directory
var helpers = require('../helpers/todos');

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodos);

router.route('/:todoId')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
