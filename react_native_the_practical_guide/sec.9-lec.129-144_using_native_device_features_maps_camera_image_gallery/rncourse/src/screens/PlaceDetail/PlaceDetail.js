import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';


//See https://github.com/oblador/react-native-vector-icons for more instructions on how to install
// this 3rd party library
//Once fullfilled steps for Android/Ios we can import the whole library or only the part that
//content the icons that we want
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions';

class PlaceDetail extends Component {
constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  state = {
    modePortrait: Dimensions.get('window').height > 500
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = (dims) => {
      this.setState({ modePortrait: dims.window.height > 500 });
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.txtContainer} >
            <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color='red'
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={
              this.state.modePortrait ?
              styles.imgContainerPort :
              styles.imgContainerLand
            }
          >
            <View style={styles.imgContainer}>
              <Image
                source={this.props.selectedPlace.image}
                style={this.state.modePortrait ? styles.placeImagePort : styles.placeImageLand}
              />
            </View>
          </View>
          <View
            style={
              this.state.modePortrait ?
              styles.imgContainerPort :
              styles.imgContainerLand
            }
          >
            <Text style={styles.textPlaceholder}>
              Hmmm!!! Pity that I have to add billing details to get maps API key.
              This wouldn't be a placeholder{'\n'}
              Latitude: {this.props.selectedPlace.location.latitude.toString()}{'\n'}
              Longitude: {this.props.selectedPlace.location.longitude.toString()}
            </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  //Main container portrait and landscape
  container: {
    marginLeft: 22,
    marginRight: 22,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  //Text container
  txtContainer: {
    flexBasis: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 5
  },
  deleteButton: {
    alignItems: 'center'
  },

  //Image and map placeholder container
  imgContainerPort: {
    backgroundColor: '#eee',
    marginBottom: 15,
    width: '100%'
  },
  imgContainerLand: {
    backgroundColor: '#eee',
    marginBottom: 15,
    width: '49%'
  },
  placeImagePort: {
    width: '100%',
    height: 200
  },
  placeImageLand: {
    width: '100%',
    height: '100%'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
