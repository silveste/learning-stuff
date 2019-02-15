import React from 'react'; //react required here to render JSX
import { TextInput, StyleSheet } from 'react-native';

/*
Introducing props with the spread operator inside
TextInput allows to pass any attribute as props
*/
const defaultInput = props => (
  <TextInput
    style={styles.input}
    underlineColorAndroid="transparent"
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 5,
    margin: 8
  }
});

export default defaultInput;
