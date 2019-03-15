import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import MainButton from '../../components/UI/MainButton/MainButton';

import backgroundImage from '../../assets/bg.jpg';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  };

  /*
  when the component is unmounted it's advisable to remove the event listener to avoid memory leaks
  as the event is not neccesary anymore
  */
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = (dims) => {
      this.setState({ viewMode: dims.window.height > 500 ? 'portrait' : 'landscape' });
  }

  loginHandler = () => {
    //Check for Auth

    //If auth show main tabs
    startMainTabs();
  }
  render() {
    let headingText = null;
    /*
    Dimensions.get returns the dimensions of the screen or the window,
    the differece is that android window doesn't include the
    soft menu bar in window dimensions
    */
    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText style={{ color: '#fff' }}>Please Log In</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <View style={styles.container} >
          {headingText}
          <MainButton
            title='Switch to Login'
            onPress={this.loginHandler}
            style={styles.button}
          />
          {/*
          By using a container to style the width of the text inputs
          we can now make the textinput reusable accross the app as the width
          is adaptable depending on the container.
          */}
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="E-mail Address" style={styles.input} />
            <View
              style={
                this.state.viewMode === 'portrait'
                ? styles.portraitPwdContainer :
                styles.landscapePwdContainer
              }
            >
              <View
                style={
                  this.state.viewMode === 'portrait'
                  ? styles.portraitPwdWrapp :
                  styles.landscapePwdWrapp
                }
              >
                <DefaultInput placeholder="E-mail Address" style={styles.input} />
              </View>
              <View
                style={
                  this.state.viewMode === 'portrait'
                  ? styles.portraitPwdWrapp :
                  styles.landscapePwdWrapp
                }
              >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
            </View>
          </View>
          <Button
            title="Submit"
            onPress={this.loginHandler}
            style={styles.button}
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
    borderColor: '#bbb',
  },
  bgImage: {
    width: '100%',
    flex: 1
  },
  landscapePwdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPwdContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePwdWrapp: {
    width: '47%'
  },
  portraitPwdWrapp: {
    width: '100%'
  }
});
export default AuthScreen;
