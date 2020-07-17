import * as actionTypes from '../actions/actionTypes';

const INITIAL_PRICE = 4; //Should be loaded from the server

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: INITIAL_PRICE
}

const reducer = (state=initialState, action) => {
  const { ingredients, totalPrice } = state;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [action.ingredientName]: {
            ...ingredients[action.ingredientName],
            quantity: ingredients[action.ingredientName].quantity + 1
          }
        },
        totalPrice: totalPrice + ingredients[action.ingredientName].price
      }
    case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...ingredients,
        [action.ingredientName]: {
          ...ingredients[action.ingredientName],
          quantity: ingredients[action.ingredientName].quantity - 1
        }
      },
      totalPrice: totalPrice - ingredients[action.ingredientName].price
    }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: INITIAL_PRICE,
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;
