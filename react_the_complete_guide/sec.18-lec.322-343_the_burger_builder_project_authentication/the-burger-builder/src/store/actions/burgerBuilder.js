import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

export const addIngredient = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: payload
  }
};

export const removeIngredient = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: payload
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-19c13.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(_error => {
        dispatch(fetchIngredientsFailed());
      });
  }
}
