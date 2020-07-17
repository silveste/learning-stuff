import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  static getDerivedStateFromProps (props, state) {
    let newState = state;
    if (props.location.state) {
      const { ingredients, totalPrice } = props.location.state;
      newState = { ingredients, totalPrice };
    }
    return newState;
  }

  render() {
    if (!this.state.ingredients || !this.state.totalPrice)  return <Redirect to="/" />
    const { ingredients, totalPrice } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.checkoutCancelHandler}
          continue={this.checkoutContinueHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={(props) => <ContactData {...props} ingredients={ingredients} totalPrice={totalPrice}/>}
        />
      </div>
    )
  }
}

export default Checkout;
