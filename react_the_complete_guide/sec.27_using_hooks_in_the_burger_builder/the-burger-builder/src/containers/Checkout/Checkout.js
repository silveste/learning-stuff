import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  const { ingredients, purchased } = props
  if (!ingredients) return <Redirect to="/" />
  if (purchased) return <Redirect to="/orders" />
  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        cancel={checkoutCancelHandler}
        continue={checkoutContinueHandler}
      />
      <Route
        path={`${props.match.url}/contact-data`}
        component={ContactData}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default withRouter(connect(mapStateToProps)(Checkout));
