import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import ListView from '../../components/ListView/ListView';

class FindPlaceScreen extends Component {
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
