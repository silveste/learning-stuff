import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

import imgPlaceholder from '../../assets/place.jpg';

class PickLocation extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={styles.placeholder} >
          <Image source={imgPlaceholder} style={styles.imgPlaceholder} />
        </View>
        <View style={styles.button}>
          <Button title='Locate Me' onPress={() => alert('Yuhuuuu!')} />
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
    imgPlaceholder: {
      width: '100%',
      height: '100%'
    }
});

export default PickLocation;
