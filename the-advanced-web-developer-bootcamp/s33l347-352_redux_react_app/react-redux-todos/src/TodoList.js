import React, {Component} from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import {addTodo, removeTodo, getTodos} from './actionCreators';
import { Route } from 'react-router-dom';
import NewTodoForm from './NewTodoForm';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount(){
    this.props.getTodos();
  }
  handleAdd(val){
    this.props.addTodo(val);
  }
  removeTodo(id){
    this.props.removeTodo(id);
  }
  render(){
    let todos = this.props.todos.map((todo) => (
      <Todo
        removeTodo={this.removeTodo.bind(this, todo._id)}
        task={todo.task}
        key={todo._id}
      />
    ));
    return(
      <div>
        <Route
          path="/todos/new"
          component={ props => (
            <NewTodoForm {...props} handleSubmit={this.handleAdd} />
          )}
        />
        <Route exact path='/todos' component={ () => <div>{todos}</div>}/>
      </div>
    );
  }
}

/*
By using the function connect (imported from react-redux)
The component gets the ability to dispatch actions to the store.
Connect requires a function as a parameter that maps the redux
state into props in react. This functions accepts the current state
as a parameter and should return those keys (stored in the state) that the component
needs. Usually that function is called mapStateToProps and returns an object with the
keys that our component needs. So that, the function returned by connect will pass
the objects as props to the component
*/
function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  };
}

/*
Alternatively a function "mapDispatchToProps" can be created.
This function will replace dispatch function by adding it as
a second parameter to the connect function.
mapDispatchToProps will return an object where the keys are functions.
Those functions are the dispatch actions, so that they can be called in the
component straight away, avoiding typing the code required to dispatch an action
every time that the component needs to dispatch it.
See an example below:
function mapDispatchToProps (dispatch){
  return ({
    addTodo: function(task){
      dispatch({
        type: REMOVE_TODO,
        task
      })
    }
  });
}
*/

/*
Other option is create the actions as a function in other file such as actionCreator.js
Those functions can be imported and passed straight away in an object as a second parameter
to the connect function.
Then those functions can be called at any moment in the component passing the arguments
required for the action
*/
export default connect(mapStateToProps, {addTodo, removeTodo, getTodos})(TodoList);
