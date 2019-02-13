import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import InputView from '../../components/InputView/InputView';
import { addPlace } from '../../store/actions';

class SharePlaceScreen extends Component {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  }

  render() {
    return (
      <View>
        <InputView
          onSubmit={this.placeAddedHandler}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

//No need mapDispatchToState so is null
export default connect(null, mapDispatchToProps)(SharePlaceScreen);
