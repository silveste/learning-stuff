/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


//Register components expect a function as a second parameter that returns the JSX
//that's why RNRedux must be a function that returns JSX instead an object that
//contains the JSX
AppRegistry.registerComponent(appName, () => App);
