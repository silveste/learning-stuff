import React, {Component} from 'react';

export default class NewTodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      task: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    //By exporting the connect function instead the component directly
    //The component has a prop to dispatch actions to the store
    this.props.handleSubmit(this.state.task);
    e.target.reset();
    /*history object is comming from react router passing through TodoList
    in destructured object {...props}*/
    this.props.history.push("/todos");
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render(){
    return (
      <form onSubmit = {this.handleSubmit}>
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="task"
          id="task"
          onChange={this.handleChange}
        />
        <button>Add a Todo &raquo;</button>
      </form>
    );
  }
}
