import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
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

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    console.log(disabledInfo);
    return (
      <>
       <Burger ingredients={this.state.ingredients}/>
       <BuildControls
         ingredientAdded={this.addIngredientHandler}
         ingredientRemoved={this.removeIngredientHandler}
         disabled={disabledInfo}
         price={this.state.totalPrice}
         purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
