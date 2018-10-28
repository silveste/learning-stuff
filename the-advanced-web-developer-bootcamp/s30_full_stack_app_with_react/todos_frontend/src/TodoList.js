import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';
import './TodoList.css';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    };
    this.loadTodos = this.loadTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }



  componentWillMount(){
    this.loadTodos();
  }

  async loadTodos(){
    try {
      let todos = await apiCalls.getTodos();
      this.setState({todos});
    } catch(e){
      console.error(e.errorMessage);
    }
  }

  async addTodo(todo){
    try {
      let newTodo = await apiCalls.createTodo(todo);
      this.setState({todos: [...this.state.todos, newTodo]});
    } catch(e){
      console.error(e.errorMessage);
    }
  }

  async deleteTodo(id){
    try {
      await apiCalls.removeTodo(id);
      const todos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos});
    } catch(e){
      console.error(e.errorMessage);
    }
  }

  async toggleTodo(todo){
    try {
      let updatedTodo = await apiCalls.updateTodo(todo);
      const todos = this.state.todos.map(todo =>
        (todo._id === updatedTodo._id) ? {...todo, completed: !todo.completed} : todo
      );
      this.setState({todos});
    } catch(e){
      console.error(e.errorMessage);
    }
  }

  render(){
    const todos = this.state.todos.map(todo => (
      <TodoItem
        key = {todo._id}
        {...todo}
        //deleteTodo and toggleTodo is binded here because we also pass specific params of every todo
        onDelete={this.deleteTodo.bind(this, todo._id)}
        onToggle={this.toggleTodo.bind(this, todo)}
      />
    ));
    return (
      <div>
        <h1>Todo List!</h1>
        <TodoForm submit={this.addTodo}/>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;
