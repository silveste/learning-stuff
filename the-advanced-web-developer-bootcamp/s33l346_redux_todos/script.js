
/* global Redux, $ */


/****** REDUX SETUP *******/
//Initial state
const initialState = {
  todos: [],
  id: 0
};

//Root reducer
const rootReducer = function(state = initialState, action){
  switch (action.type){
  case 'ADD_TODO':
    let newState = {...state};
    newState.id++;
    return {
      ...newState,
      todos: [...newState.todos, { task: action.task, id: newState.id }]
    };
  case 'REMOVE_TODO':
    let todos = state.todos.filter( val => val.id !== +action.id); //Symbol + converts the string into a number
    return {...state, todos};
  default:
    return state;
  }
};

const store = Redux.createStore(rootReducer);


/***** JQUERY HANDLERS ******/

$(document).ready(function(){
  $('ul').on('click', 'button', function(event){
    store.dispatch({
      type: 'REMOVE_TODO',
      id: $(event.target).attr('id')
    });
    $(event.target).parent().remove();
  });
  $('form').on('submit', function(event){
    event.preventDefault();
    let newTask = $('#task').val();
    store.dispatch({
      type: 'ADD_TODO',
      task: newTask
    });
    let currentState = store.getState();
    let $newLi = $("<li>", {
      text: newTask
    });
    let $newBtn = $('<button>', {
      text: 'X',
      id: currentState.id
    });
    $newLi.append($newBtn);
    $('#todos').append($newLi);
    $('form').trigger('reset');
  });
});
