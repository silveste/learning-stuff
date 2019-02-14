/*
This file is used to register screens and start an app for react native navigation
*/

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import configureStore from './src/store/configureStore';

const store = configureStore();


//Register screens
//Every screen must hava unique Id which by convention usually is NameOfApp.NameOfScreen
//and as a second parameter a function that returns the navigation compoenent (Screen)
//Third and fourth parmeters are related with redux (store and provider)
Navigation.registerComponent(
  'rncourses.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'rncourses.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'rncourses.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'rncourses.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);

//Start AppRegistry
//In this case our app will be a single screenby default
Navigation.startSingleScreenApp({
  screen: {
    screen: 'rncourses.AuthScreen',
    title: 'Login'
  }
});
