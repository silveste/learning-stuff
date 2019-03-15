import React from 'react';
import { Text, StyleSheet } from 'react-native';
/*
Text component can wrap other Text components and apply the styles in
a cascading way
Taking advantage of this, MainText is a component that can be used
to wrap other Text components and apply the styles as a default accross
all application, so that all styles for text will be centralized in MainText component
*/
const mainText = props => (
  <Text style={styles.mainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
  mainText: {
    color: '#444',
    backgroundColor: 'transparent',
    marginTop: 5,
    marginBottom: 5
  }
});

export default mainText;
