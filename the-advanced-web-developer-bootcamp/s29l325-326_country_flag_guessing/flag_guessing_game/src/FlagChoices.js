import React from 'react';
import StyledButton from './StyledButton';
import PropTypes from 'prop-types';
import './FlagChoices.css';

const FlagChoices = props => {

  let options = props.options || [];
  const {handleChange, handleSubmit} = props;
  let inputs = options.map(opt => (
    <label key={opt.id}>
      <input type='radio'
        value={opt.id}
        checked={opt.checked}
        onChange={handleChange}
        name="flag-choice" />
      {opt.name}
    </label>
  ));

  return (
    <form className="flag-form" onSubmit={handleSubmit}>
      {inputs}
      <StyledButton text='GUESS' type="submit"/>
    </form>
  );
};

export default FlagChoices;

FlagChoices.propTypes = {
  options: PropTypes.array,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};
