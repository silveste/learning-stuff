import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import { getImageSource } from 'react-native-vector-icons/Ionicons';

// A function is required so that the tabs are loaded when call the
// function instead when importing this file

const startTabs = () => {
  // For the tabs we need to get some icons and vector icons library provides a way to do do it
  // hoewever, the helper that retrieves the image return a promise as it is asyncronous
  // therefore we have to start the tab after the promise has finished by including it inside
  // the then() method
  const isAndroid = Platform.OS === 'android';
  Promise.all([
    getImageSource(isAndroid ? 'md-map' : 'ios-map', 30), // Arguments: Icon, size, color
    getImageSource(isAndroid ? 'md-share-alt' : 'ios-share-alt', 30),
    getImageSource(isAndroid ? 'md-menu' : 'ios-menu', 30)
  ])
    .then(icons => (
    // Automatically render a tab bar
      Navigation.startTabBasedApp({
      // tabs is an array of all tabs used
        tabs: [
          // Object that defines a tab (see docs for more information)
          {
            // Load a screen based on screen unique identifiers
            // It's good approach to register all screens in one place, in this case we
            // register all of them in App.js
            screen: 'rncourses.FindPlaceScreen',
            label: 'Find Place', // Appears in the tab
            title: 'Find Place', // Appears in the top screen
            icon: icons[0],
            // includes the button to show the side pane (sidedrawer)
            navigatorButtons: {
              leftButtons: [
                {
                  icon: icons[2],
                  title: 'Menu',
                  // Id is required to identify the event that is triggered when pressing the buton
                  id: 'sideDrawerToggle'
                }
              ]
            }
          },
          {
            screen: 'rncourses.SharePlaceScreen',
            label: 'Share Place',
            title: 'Share Place',
            icon: icons[1],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: icons[2],
                  title: 'Menu',
                  id: 'sideDrawerToggle'
                }
              ]
            }
          }
        ],
        // See react-navigation docs for styles
        tabStyle: {
          tabBarSelectedButtonColor: 'orange'
        },
        appStyle: {
          tabBarSelectedButtonColor: 'orange'
        },
        // See react native navigaton docs to find more information about drawer Object
        // drawer shows a side pane either on the left or on the right
        drawer: {
          left: {
            screen: 'rncourses.SideDrawerScreen'
          }
        }
      })
    ));
};

export default startTabs;
