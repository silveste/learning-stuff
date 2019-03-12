/* global __DEV__, window */
/*
Factory function that returns the store
*/

import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
// thunk allows to set asynchronous code in the action creators
// when an action creator returns a function instad an object thunk
// catches the returned function and wait untill the promise is resolved
// returning at the end the object that an action cretor should return
// Thunk provides the dispatch argument that can be used in the action creators
import thunk from 'redux-thunk';
import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';


// Merge all reducers
const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer
});

// Allows to integrate redux devtools with react native debugger tools
// See here:
// https://github.com/jhen0409/react-native-debugger
// https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md
let composeEnhancers = compose;

// __DEV__ Re act native env variable that indicates dev mode
// If in dev mode include redux dev tools
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


export default configureStore;
