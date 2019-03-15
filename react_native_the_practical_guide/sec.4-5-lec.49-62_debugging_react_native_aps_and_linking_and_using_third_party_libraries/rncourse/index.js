/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import configureStore from './src/store/configureStore';

const store = configureStore();

//RNRedux = React Native Redux
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

//Register components expect a function as a second parameter that returns the JSX
//that's why RNRedux must be a function that returns JSX instead an object that
//contains the JSX
AppRegistry.registerComponent(appName, () => RNRedux);
