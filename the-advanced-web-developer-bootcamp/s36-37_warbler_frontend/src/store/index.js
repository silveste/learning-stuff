import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux'; //compose allow to combine function together
import thunk from 'redux-thunk'; //Middleware that allow to delay the evaluation of some expressions making async functions available in redux


export function configureStore(){
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
