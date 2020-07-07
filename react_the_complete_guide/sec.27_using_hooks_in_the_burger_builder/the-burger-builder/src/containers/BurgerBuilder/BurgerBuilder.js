import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

const BurgerBuilder = props => {
  const { history } = props;
  const [ purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuth = useSelector(state => state.auth.token !== null);

  const getIngredientsQuantity = (ingredients) => {
    if (!ingredients) return {};
    const keys = Object.keys(ingredients);
    return keys.reduce((acc,key) => {
      return {
        ...acc,
        [key]: ingredients[key].quantity
      }
    },{})
  }

  const updatePuchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce( (acc,val) => acc + val.quantity, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if(isAuth) {
      setPurchasing(true);
    } else {
      dispatch(actions.setAuthRedirectPath('/checkout'));
      history.push('/auth');
    }

  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    dispatch(actions.purchaseInit());
    history.push('/checkout');
  }

  useEffect(() => {
    dispatch(actions.initIngredients());
  },[dispatch]);

  const disabledInfo = getIngredientsQuantity(ingredients);
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    orderSummary = <OrderSummary
      ingredients={getIngredientsQuantity(ingredients)}
      price={totalPrice}
      cancel={purchaseCancelHandler}
      continue={purchaseContinueHandler}
    />
    burger = (
      <>
        <Burger ingredients={ingredients}/>
        <BuildControls
          ingredientAdded={(ingredientName) => dispatch(actions.addIngredient(ingredientName))}
          ingredientRemoved={(ingredientName) => dispatch(actions.removeIngredient(ingredientName))}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePuchaseState(ingredients)}
          submitOrder={purchaseHandler}
          isAuth={isAuth}
        />
      </>
    );
  }
  return (
    <>
      <Modal show={purchasing} close={purchaseCancelHandler}>
        { orderSummary }
      </Modal>
      { burger }
    </>
  );
}

export default withErrorHandler(BurgerBuilder, axios);
