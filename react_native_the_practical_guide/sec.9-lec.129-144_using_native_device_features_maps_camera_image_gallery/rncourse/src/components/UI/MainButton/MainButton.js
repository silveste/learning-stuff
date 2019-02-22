import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback, //Wrapper that only can be used on Android
  Text,
  View,
  StyleSheet,
  Platform // Can be used to find out the OS at runtime
} from 'react-native';

const mainButton = props => {
  const content = (
      <View
        style={[
          styles.button,
          props.disabled ? styles.buttonDisabled : null,
          [props.style]
        ]}
      >
        <Text
          style={[
            styles.text,
            props.disabled ? styles.textDisabled : null,
            props.style]}
        >{props.title}</Text>
      </View>
  );
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
       {content}
      </TouchableNativeFeedback>
    );
  }
  //If is not android, therefore IOS
  return (
        <TouchableOpacity onPress={props.onPress}>
          {content}
        </TouchableOpacity>
  );
};

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
  },
  buttonDisabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  textDisabled: {
    color: '#aaa'
  }
});

export default mainButton;
