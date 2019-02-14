import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import InputView from '../../components/InputView/InputView';
import { addPlace } from '../../store/actions';

class SharePlaceScreen extends Component {
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
