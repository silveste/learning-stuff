import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';
import InputView from '../../components/InputView/InputView';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainButton from '../../components/UI/MainButton/MainButton';
import validate from '../../utility/validation';


class SharePlaceScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  constructor(props) {
    super(props);
    //listener for navigation events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    shareButtonDisabled: true,
    controls: {
      location: {
        value: null,
        valid: false
      },
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      image: {
        value: null,
        valid: false
      }
    }
  };

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

  placeAddedHandler = () => {
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        this.state.controls.image.value,
      );

      this.setState(prevState => {
        return ({
          controls: {
            ...prevState.controls,
            placeName: '',
          },
          shareButtonDisabled: true
        });
      });
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return ({
          controls: {
            ...prevState.controls,
            image: {
              value: image,
              valid: true
            }
          },
          shareButtonDisabled: !(
            prevState.controls.placeName.valid &&
            prevState.controls.location.valid
          )
        });
    });
  }

  placeNameChangeHandler = val => {
    const valid = validate(val, this.state.controls.placeName.validationRules);
    this.setState(prevState => {
      return ({
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val.trim(),
            valid
          }
        },
        shareButtonDisabled: !(
          valid &&
          prevState.controls.location.valid &&
          prevState.controls.image.valid
        )
      });
    });
  }

  locationPickedHandler = loc => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: loc,
            valid: true
          }
        },
        shareButtonDisabled: !(
          prevState.controls.placeName.valid &&
          prevState.controls.image.valid
        )
      };
    });
  };

  render() {
    let submitButton = (
      <MainButton
        title="Share the place"
        onPress={this.placeAddedHandler}
        disabled={this.state.shareButtonDisabled}
      />
    );
    if (this.props.isLoading) {
      submitButton = (<ActivityIndicator />);
    }
    /*
    Scrollview has infinite height so that by applying "flex: 1" makes no sense
    as it needs a limited size and scrollview has ingfinite height
    contentContainerStyle prop allow to use flex inside scroll View by applying styles
    using contentContainerStyle instead style property the issue is solved for ios but android
    loose the ability to scroll. (TODO = search more information about contentContainerStyle)
    To solve this issue a View component is used inside ScrollView component
    Note The following code is only working for Ios:
    <ScrollView contentContainerStyle={styles.container} >
      {content}
    </ScrollView>
    */
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPicked={this.locationPickedHandler} />
          <InputView
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangeHandler}
            style={styles.input}
          />
          <View style={styles.button}>{submitButton}</View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20
    },
    button: {
      margin: 8
    },
});

const mapStateTopProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  };
};

//No need mapDispatchToState so is null
export default connect(mapStateTopProps, mapDispatchToProps)(SharePlaceScreen);
