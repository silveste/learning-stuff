import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated // API for animations see react native docs
} from 'react-native';
import { connect } from 'react-redux';

import ListView from '../../components/ListView/ListView';
import { getPlaces, uiShowFindPlaces } from '../../store/actions';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  constructor(props) {
    super(props);
    const { navigator } = this.props;
    // listener for navigation events
    navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    anyPlace: false,
    removeAnim: new Animated.Value(1), // Argument 1 => starting point at opacity and scale 1
    fadeInAnim: new Animated.Value(0)
  }

  onNavigatorEvent = (event) => {
    const { navigator, updateNavigatorTab, onLoadPlaces } = this.props;
    // To find out event types name, the faster way
    // is to click the event and check the console using devtools

    // ScreenChangedEvent with id willAppear occurs when user press
    // Share Place tab button.
    // In this moment we need to update the state to SharePlaceTab 1
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        updateNavigatorTab();
        onLoadPlaces();
      }
    }
    if (event.type === 'NavBarButtonPress'
        && event.id === 'sideDrawerToggle') {
      // see toggelDrawerMathod in in react native navigation docs
      navigator.toggleDrawer({
        side: 'left'
      });
    }
  }

  placesLoadedHandler = () => {
    const { fadeInAnim } = this.state;
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  placesSearchHandler = () => {
    const { removeAnim } = this.state;
    /*
    First parameter indicates the value state and retrieves the initial value
    in this case this.state.removeAnim has been set to 1.
    Second parameter is an object that indicates the final estate value (toValue)
    and the duration in miliseconds.
    start() starts the application and Animation API handles automatically the estate
    start acept one argument which is the function that will be executed after the
    animation finished
    */
    Animated.timing(removeAnim, {
      toValue: 0,
      duration: 500,
      // useNativeDriver: true Uses the native driver (more efficient) instead performm in js
      useNativeDriver: true
    }).start(() => {
      this.setState({
        anyPlace: true
      });
      this.placesLoadedHandler();
    });
  }

  itemSelectedHandler = (key) => {
    const { places, navigator } = this.props;
    const place = places.find(isThisPlace => key === isThisPlace.key);
    // props.navigator are available when using react native navigation
    // see API documentation
    // The method push push anew screen into react native navigator stack
    navigator.push({
      screen: 'rncourses.PlaceDetailScreen',
      title: place.placeName,
      passProps: {
        selectedPlace: place
      }
    });
  }

  render() {
    const { removeAnim, anyPlace, fadeInAnim } = this.state;
    const { places } = this.props;
    let content = (
      <Animated.View
        style={{
          ...styles.buttonContainer,
          opacity: removeAnim,
          transform: [
            {
              scale: removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>
              Find Places
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (anyPlace) {
      content = (
        <Animated.View
          style={{ opacity: fadeInAnim }}
        >
          <ListView places={places} onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      );
    }
    return (content);
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => ({ places: state.places.places });

const mapDispatchToProps = dispatch => ({
  onLoadPlaces: () => dispatch(getPlaces()),
  updateNavigatorTab: () => dispatch(uiShowFindPlaces())
});

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
