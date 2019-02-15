import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
  loginHandler = () => {
    //Check for Auth

    //If auth show main tabs
    startMainTabs();
  }
  render() {
    return (
      <View style={styles.container} >
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
        <Button
          title="Switch to Login"
        />
        {/*
        By using a container to style the width of the text inputs
        we can now make the textinput reusable accross the app as the width
        is adaptable depending on the container.
        */}
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="E-mail Address" style={styles.input} />
          <DefaultInput placeholder="E-mail Address" style={styles.input} />
          <DefaultInput placeholder="Password" style={styles.input} />
        </View>
        <Button
          title="Submit"
          onPress={this.loginHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  }
});
export default AuthScreen;
