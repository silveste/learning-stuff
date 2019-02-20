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
        <View style={this.state.modePortrait ? styles.containerPort : styles.containerLand}>
          <View style={styles.imgContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={this.state.modePortrait ? styles.placeImagePort : styles.placeImageLand}
            />
          </View>
          <View style={styles.txtContainer}>
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
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPort: {
    margin: 22,
    flexDirection: 'column',
    flex: 1
  },
  containerLand: {
    margin: 22,
    flexDirection: 'row'
  },
  placeImagePort: {
    width: '100%',
    height: 200
  },
  placeImageLand: {
    width: 300,
    height: '100%'
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    margin: 5
  },
  deleteButton: {
    alignItems: 'center'
  },
  imgContainer: {
    flex: 1
  },
  txtContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
