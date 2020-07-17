import { combineReducers } from 'redux';

import burguerBuilderReducer from './burgerBuilder';
import orderReducer from './orders';
import authReducer from './auth';

const rootReducer = combineReducers({
  burgerBuilder: burguerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

export default rootReducer;
