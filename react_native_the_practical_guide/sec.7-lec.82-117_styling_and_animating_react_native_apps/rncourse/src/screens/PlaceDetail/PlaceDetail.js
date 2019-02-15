import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


//See https://github.com/oblador/react-native-vector-icons for more instructions on how to install
// this 3rd party library
//Once fullfilled steps for Android/Ios we can import the whole library or only the part that
//content the icons that we want
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions';

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }
  render() {
    return (
        <View style={styles.container}>
          <View>
            <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
            <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon size={30} name='md-trash' color='red' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    margin: 5
  },
  deleteButton: {
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
