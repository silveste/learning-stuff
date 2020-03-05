import React from 'react';
import './Input.css';

export default (props) => {

  const inputLength = props.value.length;

  const onInputChangeHandler = (event) => {
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
    <div>
      <label className='user-input' > Type Something:
        <input
          style={inputStyle}
          onChange={onInputChangeHandler}
          type="text"
          value={props.value}
        />
      </label>
      <p>{inputLength}</p>
    </div>
  )
}
