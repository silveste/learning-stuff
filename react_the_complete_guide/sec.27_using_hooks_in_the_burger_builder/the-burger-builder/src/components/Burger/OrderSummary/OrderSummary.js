import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const { ingredients, price, cancel } = props;
  const listItems = Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{listItems}</ul>
      <p><strong>Total Price: {price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button type='Danger' onClick={cancel}>CANCEL</Button>
      <Button type='Success' onClick={props.continue}>CONTINUE</Button>
    </>
  );
}

export default OrderSummary;
