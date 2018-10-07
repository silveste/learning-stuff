
//Action types used in the reducer
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const GET_TODOS = 'GET_TODOS';


//Action functions
function handleTodos (data){
  return {
    type: GET_TODOS,
    data
  };
}
function handleAdd (task) {
  return {
    type: ADD_TODO,
    task
  };
}

function handleRemove (id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

/*
Actions won't be triggered straight away instead the action creator functions
will return a function that executes an asynchronous action and when completed the
action will be dispatched
*/
export function getTodos() {
  return dispatch => {
    return fetch('http://localhost:3001/api/todos')
      .then (res => res.json())
      .then (data => dispatch(handleTodos(data)))
      .catch (err => console.log('Something went wrong', err));
  };
}

export function addTodo(task) {
  return dispatch => {
    return fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: new Headers ({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({task})
    })
      .then (res => res.json())
      .then (data => {
        return dispatch(handleAdd(data));})
      .catch (err => console.log('Something went wrong', err));
  };
}

export function removeTodo(id) {
  return dispatch => {
    return fetch(`http://localhost:3001/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then (res => res.json())
      .then (() => dispatch(handleRemove(id)))
      .catch (err => console.log('Something went wrong', err));
  };
}
