import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement;
  const inputClasses = [classes.InputElement];
  if (props.invalid) {
      inputClasses.push(classes.Invalid);
  }

  switch ( props.type ) {
    case ( 'textarea' ):
      inputElement = <textarea
          {...props.config}
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.invalid ? props.invalidMsg : props.config.placeholder}
        />;
        break;
    case ( 'select' ):
      inputElement = (
        <>
          <select
            {...props.config}
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.onChange}
          >
            <option value=''>{props.invalid ? props.invalidMsg : ''}</option>
            {props.config.options.map(option => (
              <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))}
          </select>
        </>
      );
        break;
    default:
      inputElement = <input
          {...props.config}
          className={inputClasses.join(' ')}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.invalid ? props.invalidMsg : props.config.placeholder}
        />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        <span>{props.label}</span>
        {inputElement}
      </label>
    </div>
  );

}

export default input;
