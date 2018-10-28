import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

class TodoForm extends Component{
  constructor(props){
    super(props);
    this.state = {inputValue: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({
      inputValue: e.target.value
    });
  }
  handleSubmit(){
    this.props.submit(this.state.inputValue);
  }
  render(){
    return (
      <div>
        <input type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}

        />
        <button
          onClick={this.handleSubmit}
        >
          Add Todo
        </button>
      </div>
    );
  }
}

export default TodoForm;

TodoForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submit: PropTypes.func,
  value: PropTypes.string
};
