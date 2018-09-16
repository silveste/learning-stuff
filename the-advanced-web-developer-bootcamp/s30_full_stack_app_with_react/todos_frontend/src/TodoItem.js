import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li>
    <span
      onClick={onToggle}
      style = {{textDecoration: completed ? 'line-through': 'none'}}
    >
      {name}
    </span>
    <span onClick={onDelete}> X </span>
  </li>
);

export default TodoItem;

TodoItem.propTypes = {
  name: PropTypes.string,
  completed: PropTypes.bool,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func
};
