import React from 'react'; //react required here to render JSX
import { TextInput, StyleSheet } from 'react-native';

/*
Introducing props with the spread operator inside
TextInput allows to pass any attribute as props
However regarding the styles to avoid overriding all styles
(and as style attribute can get an array where last styles override the first ones) is advisable
to use props.style as second item insyde style array = style={[styles.input, props.style]}.
Note also that spread oprator {...props} is before the style attribute
otherwise props.style would override the style attribute defined in the component
in summary, order in style array and in the component attributes matters
*/
const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  }
});

export default defaultInput;
