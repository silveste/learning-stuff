import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  <button
    onClick={props.onClick}
    className={[classes.Button, classes[props.type]].join(' ')}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;
