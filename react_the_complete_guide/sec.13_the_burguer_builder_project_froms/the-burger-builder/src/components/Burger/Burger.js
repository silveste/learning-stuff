import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let burgerIngredients = Object.keys(props.ingredients).flatMap(igKey => {
    return [...Array(props.ingredients[igKey])].map( (_, i) => {
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
