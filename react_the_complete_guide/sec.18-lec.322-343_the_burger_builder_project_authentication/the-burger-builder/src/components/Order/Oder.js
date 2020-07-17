import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for( let ingredientName in props.ingredients ) {
    ingredients.push(
      <span
        key={ingredientName}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
        {ingredientName} ({props.ingredients[ingredientName].quantity})
      </span>
    );
  }
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
