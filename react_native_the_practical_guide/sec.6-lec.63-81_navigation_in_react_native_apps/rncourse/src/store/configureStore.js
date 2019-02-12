/* global __DEV__, window */
/*
Factory function that returns the store
*/

import { createStore, combineReducers, compose } from 'redux';
import placesReducer from './reducers/places';


//Merge all reducers
const rootReducer = combineReducers({
  places: placesReducer
});

// Allows to integrate redux devtools with react native debugger tools
// See here:
// https://github.com/jhen0409/react-native-debugger
// https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md
let composeEnhancers = compose;

//__DEV__ Re act native env variable that indicates dev mode
//If in dev mode include redux dev tools
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;
