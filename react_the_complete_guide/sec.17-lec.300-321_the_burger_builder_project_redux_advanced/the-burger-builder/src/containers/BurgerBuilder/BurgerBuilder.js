import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  getIngredientsQuantity = (ingredients) => {
    if (!ingredients) return {};
    const keys = Object.keys(ingredients);
    return keys.reduce((acc,key) => {
      return {
        ...acc,
        [key]: ingredients[key].quantity
      }
    },{})
  }

  updatePuchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce( (acc,val) => acc + val.quantity, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  render () {
    const disabledInfo = this.getIngredientsQuantity(this.props.ingredients);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ingredients) {
      orderSummary = <OrderSummary
        ingredients={this.getIngredientsQuantity(this.props.ingredients)}
        price={this.props.totalPrice}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
      />
      burger = (
        <>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePuchaseState(this.props.ingredients)}
            submitOrder={this.purchaseHandler}
          />
        </>
      );
    }
    return (
      <>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          { orderSummary }
        </Modal>
        { burger }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
