import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122
    },
    locationChosen: false
  };

  pickLocationHandler = () => {
    const coords = {
      latitude: (180 * Math.random()) - 90,
      longitude: (360 * Math.random()) - 180
    };
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          ...coords
        },
        locationChosen: true
      };
    });
    this.props.onLocationPicked(coords);
  }

  render() {
    return (
      <React.Fragment>
          <View style={styles.placeholder} >
            <Text style={styles.textPlaceholder}>
              Hmmm!!! Pity that I have to add billing details to get maps API key.
              This wouldn't be a placeholder
            </Text>
            <Text style={styles.textPlaceHolderBold}>
              Latitude: {this.state.focusedLocation.latitude.toString()}{'\n'}
              Longitude: {this.state.focusedLocation.longitude.toString()}{'\n'}
              LatDelta: {this.state.focusedLocation.latitudeDelta.toString()}{'\n'}
              LongDelta: {this.state.focusedLocation.longitudeDelta.toString()}
            </Text>
          </View>
        <View style={styles.button}>
          <Button title='Locate Me' onPress={this.pickLocationHandler} />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
    placeholder: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      width: '100%',
      height: 150
    },
    button: {
      margin: 8
    },
    textPlaceholder: {
      fontWeight: '900'
    }
});

export default PickLocation;
