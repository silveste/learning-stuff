$(document).ready(function(){
  $.getJSON("api/todos").then(addTodos);

  $('#todoInput').keypress(function(event){
    if(event.which === 13){
      createTodo();
    }
  });

  $('.list').on('click', 'span', function(e){
    e.stopPropagation(); // Avoid triggerss events listened on parents
    deleteTodo($(this).parent());
  });

  $('.list').on('click', 'li', function(){
    toggleDone($(this));
  });
});

function addTodos(todos){
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

function addTodo(todo){
  var newTodo = $('<li>' + todo.name + '<span>X</span></li>');
  newTodo.data('id', todo._id); // Stores the ID in the element
  newTodo.data('completed', todo.completed); // Stores the if completed in the element
  newTodo.addClass('task');
  if(todo.completed){
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

function createTodo(){
  var userInput = $('#todoInput').val().trim();
  $.post('/api/todos',{name: userInput})
  .then(function(newTodo){
    addTodo(newTodo);
    $('#todoInput').val('');
  })
  .catch(function(err){
    console.log(err);
  });
}

function deleteTodo(todoElement) {
  var url = 'api/todos/' + todoElement.data('id');
  $.ajax({
    method: 'DELETE',
    url: url
  })
  .then(function(){
    todoElement.remove();
  });
}

function toggleDone(todoElement){
  var url = 'api/todos/' + todoElement.data('id');
  var isDone = !todoElement.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: url,
    data: updateData
  })
  .then(function(updatedTodo){
    todoElement.toggleClass('done');
    todoElement.data('completed', isDone);
  });
}
