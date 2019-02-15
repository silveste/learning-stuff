import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import MainButton from '../../components/UI/MainButton/MainButton';

import backgroundImage from '../../assets/bg.jpg';

class AuthScreen extends Component {
  loginHandler = () => {
    //Check for Auth

    //If auth show main tabs
    startMainTabs();
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <View style={styles.container} >
          <MainText>
            <HeadingText style={{ color: '#fff' }}>Please Log In</HeadingText>
          </MainText>
          <MainButton
            title='Switch to Login'
            onPress={this.loginHandler}
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
      </ImageBackground>
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
  },
  bgImage: {
    width: '100%',
    flex: 1
  }
});
export default AuthScreen;
