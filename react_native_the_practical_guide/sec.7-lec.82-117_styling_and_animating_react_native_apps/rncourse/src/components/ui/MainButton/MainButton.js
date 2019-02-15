import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const mainButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[
        styles.button,
        [props.style]
      ]}
    >
      <Text style={[styles.text, props.style]} >{props.title}</Text>
    </View>
  </TouchableOpacity>
);

//Styles are default values and can be overrided by passing style property in props
const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#29aaf4'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default mainButton;
