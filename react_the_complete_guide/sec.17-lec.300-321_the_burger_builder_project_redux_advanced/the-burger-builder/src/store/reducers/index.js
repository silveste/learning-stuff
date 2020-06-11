import { combineReducers } from 'redux';

import burguerBuilderReducer from './burgerBuilder';
import orderReducer from './orders';

const rootReducer = combineReducers({
  burgerBuilder: burguerBuilderReducer,
  order: orderReducer,
});

export default rootReducer;
