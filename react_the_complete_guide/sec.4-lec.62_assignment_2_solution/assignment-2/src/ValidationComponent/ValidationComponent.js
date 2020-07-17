import React from 'react';

export default (props) => {
  const message = props.length < 5 ? "Text too Short" : "Text long enough";
  return (
    <div>
      <h1>Text Validation</h1>
      <p>{message}</p>
    </div>
  )
}
