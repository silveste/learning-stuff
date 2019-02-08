/*
Factory function that returns the store
*/

import { createStore, combineReducers } from 'redux';
import placesReducer from './reducers/places';


//Merge all reducers
const rootReducer = combineReducers({
  places: placesReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
