import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  /*
  componentDidUpdate () {
    console.log('[OrderSummary] will update');
  }
  */
  render () {
    const listItems = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{listItems}</ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button type='Danger' onClick={this.props.cancel}>CANCEL</Button>
        <Button type='Success' onClick={this.props.continue}>CONTINUE</Button>
      </>
    );
  }
}

export default OrderSummary;
