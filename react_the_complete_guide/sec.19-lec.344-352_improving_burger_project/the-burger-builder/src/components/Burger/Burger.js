import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const { ingredients } = props;
  let burgerIngredients = Object.keys(ingredients)
    .sort((a,b) => ingredients[a].pos > ingredients[b].pos)
    .flatMap(igKey => {
      return [...Array(ingredients[igKey].quantity)].map( (_, i) => {
         return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
  });
  if (burgerIngredients.length === 0) {
    burgerIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      { burgerIngredients }
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
