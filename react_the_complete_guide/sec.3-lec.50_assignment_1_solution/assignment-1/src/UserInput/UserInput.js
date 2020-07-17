import React from 'react';
import './UserInput.css';

export default (props) => {

  const onInputchangeHandler = (event) => {
    props.onChange(event.target.value);
  }
  const inputStyle = {
    backgroundColor: '#f5f5f5',
    outline: 'none',
    border: 'none',
    display: 'inline-block',
    margin: '0 1rem',
  }

  return (
      <label className='user-input' > User Name:
        <input
          style={inputStyle}
          onChange={onInputchangeHandler}
          type="text"
          value={props.value}
        />
      </label>
  )
}
