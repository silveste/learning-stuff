import { combineReducers } from 'redux';

import counterReducer from './reducers/counter';
import resultsReducer from './reducers/results';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
});

export default rootReducer;
