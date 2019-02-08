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
import { connect } from 'react-redux';

import ListView from './src/components/ListView/ListView';
import InputView from './src/components/InputView/InputView';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions';

type Props = {};
class App extends Component<Props> {

  handleSubmit = val => this.props.onAddPlace(val);

  placeSeletedHandler = key => this.props.onSelectPlace(key);

  placeDeletedHandler = () => this.props.onDeletePlace();

  modalClosedHandler = () => this.props.onDeselectPlace()

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <InputView onSubmit={this.handleSubmit} />
        <ListView
          places={this.props.places}
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

//map state properties (in store) to props
//these props can be used to read the state
const mapStateToProps = state => {
  return {
    //state comes from the store, 1st places from combineReducers refers to places reducer
    places: state.places.places, //second places refers to places array set in reducer places.js
    selectedPlace: state.places.selectedPlace //selectedPlace is set in reducer places.js
  };
};

//map actions defined in store/actions/index.js to props functions (action dispatch functions)
//these props can be used to modify(write) the state
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
