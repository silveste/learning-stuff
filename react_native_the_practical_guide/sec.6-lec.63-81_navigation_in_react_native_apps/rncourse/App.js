/*
This file is used to register screens and start an app for react native navigation
*/

import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

//Register screens
//Every screen must hava unique Id which by convention usually is NameOfApp.NameOfScreen
//and as a second parameter a function that returns the navigation compoenent (Screen)
Navigation.registerComponent('rncourses.AuthScreen', () => AuthScreen);
Navigation.registerComponent('rncourses.SharePlaceScreen', () => SharePlaceScreen);
Navigation.registerComponent('rncourses.FindPlaceScreen', () => FindPlaceScreen);

//Start AppRegistry
//In this case our app will be a single screenby default
Navigation.startSingleScreenApp({
  screen: {
    screen: 'rncourses.AuthScreen',
    title: 'Login'
  }
});
