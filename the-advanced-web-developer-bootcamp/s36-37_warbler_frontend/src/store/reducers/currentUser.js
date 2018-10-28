import {SET_CURRENT_USER} from '../actionsTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {} //user info  when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      // turn empty object into false or if there are keys, true
      //By using the double negation we turn any value into a boolean value
      isAuthenticated: !!Object.keys(action.user).length,
      user: action.user
    };
  default:
    return state;
  }
};
