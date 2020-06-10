import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/rootReducer';

const logger = store => {
  return next => {
    return action => {
      console.log(`[Middleware] Dispatching ${action.type}`)
      const result = next(action);
      console.log('[Middleware] next state', store.getState())
      return result;
    }
  }
}

// Redux extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
