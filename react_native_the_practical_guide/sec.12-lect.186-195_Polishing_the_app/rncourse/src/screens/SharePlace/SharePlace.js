import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace, uiShowSharePlaces } from '../../store/actions';
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
    const { navigator } = this.props;
    // listener for navigation events
    navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentWillMount() {
    this.reset();
  }

  componentDidUpdate() {
    const { navigator, NavigatorTab } = this.props;
    navigator.switchToTab({ tabIndex: NavigatorTab });
  }

  reset = () => (this.setState({
    shareButtonDisabled: true,
    controls: {
      location: {
        value: null,
        valid: false
      },
      placeName: {
        value: '',
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      image: {
        value: null,
        valid: false
      }
    }
  }));

  onNavigatorEvent = (event) => {
    const { navigator, updateNavigatorTab } = this.props;
    // To find out event types name, the faster way
    // is to click the event and check the console using devtools

    // ScreenChangedEvent with id willAppear occurs when user press
    // Share Place tab button.
    // In this moment we need to update the state to SharePlaceTab 1
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        updateNavigatorTab();
      }
    }
    if (event.type === 'NavBarButtonPress'
        && event.id === 'sideDrawerToggle') {
      // see toggelDrawerMethod in in react native navigation docs
      navigator.toggleDrawer({
        side: 'left'
      });
    }
  }

  placeAddedHandler = () => {
    const { onAddPlace } = this.props;
    const { controls } = this.state;
    onAddPlace(
      controls.placeName.value,
      controls.location.value,
      controls.image.value,
    );

    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  }

  imagePickedHandler = image => this.setState(prevState => ({
    controls: {
      ...prevState.controls,
      image: {
        value: image,
        valid: true
      }
    },
    shareButtonDisabled: !(
      prevState.controls.placeName.valid
      && prevState.controls.location.valid
    )
  }));


  placeNameChangeHandler = (val) => {
    const { controls } = this.state;
    const valid = validate(val, controls.placeName.validationRules);
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: val.trim(),
          valid
        }
      },
      shareButtonDisabled: !(
        valid
        && prevState.controls.location.valid
        && prevState.controls.image.valid
      )
    }));
  }

  locationPickedHandler = loc => this.setState(prevState => ({
    controls: {
      ...prevState.controls,
      location: {
        value: loc,
        valid: true
      }
    },
    shareButtonDisabled: !(
      prevState.controls.placeName.valid
      && prevState.controls.image.valid
    )
  }));

  render() {
    const { shareButtonDisabled, controls } = this.state;
    const { isLoading } = this.props;
    let submitButton = (
      <MainButton
        title="Share the place"
        onPress={this.placeAddedHandler}
        disabled={shareButtonDisabled}
      />
    );
    if (isLoading) {
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
          <PickImage
            onImagePicked={this.imagePickedHandler}
            ref={(ref) => { this.imagePicker = ref; }}
          />
          <PickLocation
            onLocationPicked={this.locationPickedHandler}
            ref={(ref) => { this.locationPicker = ref; }}
          />
          <InputView
            placeName={controls.placeName.value}
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

const mapStateTopProps = state => ({
  isLoading: state.ui.isLoading,
  NavigatorTab: state.ui.NavigatorTab
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
  updateNavigatorTab: () => dispatch(uiShowSharePlaces())
});

// No need mapDispatchToState so is null
export default connect(mapStateTopProps, mapDispatchToProps)(SharePlaceScreen);
