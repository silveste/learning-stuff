/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ListView from './src/components/ListView/ListView';
import InputView from './src/components/InputView/InputView';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/

type Props = {};
export default class App extends Component<Props> {

  state = {
    places: [],
    selectedPlace: null
  };

  handleSubmit = val => {
    this.setState(prevState => {
      /*
      Math.random is not a correct solution to set a key as
      there is a chance to get the same number
      */
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: val,
          image: {
            uri: 'https://loremflickr.com/300/300'
          }
        })
      };
    });
  };

  placeSeletedHandler = key => {
    this.setState(prevState => {
        return {
          selectedPlace: prevState.places.find(place => place.key === key)
        };
    });
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
        return {
          places: prevState.places.filter(place => place.key !== prevState.selectedPlace.key),
          selectedPlace: null
        };
    });
  }
  
  modalClosedHandler = () => this.setState({ selectedPlace: null });

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <InputView onSubmit={this.handleSubmit} />
        <ListView
          places={this.state.places}
          onItemSelected={this.placeSeletedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }
});
