import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import ListView from '../../components/ListView/ListView';

class FindPlaceScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };
  
  constructor(props) {
    super(props);
    //listener for navigation events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    //To find out event types name, the faster way
    //is to click the event and check the console using devtools
    if (event.type === 'NavBarButtonPress'
        && event.id === 'sideDrawerToggle') {
          //see toggelDrawerMathod in in react native navigation docs
          this.props.navigator.toggleDrawer({
            side: 'left'
          });
    }
  }
  itemSelectedHandler = key => {
    const place = this.props.places.find(isThisPlace => key === isThisPlace.key);
    //props.navigator are available when using react native navigation
    //see API documentation
    //The method push push anew screen into react native navigator stack
    this.props.navigator.push({
      screen: 'rncourses.PlaceDetailScreen',
      title: place.name,
      passProps: {
        selectedPlace: place
      }
    });
  }
  render() {
    return (
      <View>
        <ListView places={this.props.places} onItemSelected={this.itemSelectedHandler} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
