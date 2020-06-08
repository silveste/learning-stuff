import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  updatePuchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce( (acc,val) => acc + val );
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const count = ingredients[type] + 1;
    const newIngredients = { ...ingredients };
    newIngredients[type] = count;
    const newPrice = totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePuchaseState(newIngredients);
  }

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const count = ingredients[type] - 1;
    if (count < 0) return;
    const newIngredients = { ...ingredients }
    newIngredients[type] = count;
    const newPrice = totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePuchaseState(newIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const { ingredients, totalPrice } = this.state;
    this.props.history.push({
      pathname: '/checkout',
      state: { ingredients, totalPrice }
    });
  }

  componentDidMount () {
    axios.get('https://react-my-burger-19c13.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(_error => {
        this.setState({error: true});
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
      />
      burger = (
        <>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            submitOrder={this.purchaseHandler}
          />
        </>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);
