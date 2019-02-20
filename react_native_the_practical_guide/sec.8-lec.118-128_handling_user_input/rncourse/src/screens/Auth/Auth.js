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
import validate from '../../utility/validation';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    fields: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password: {
        value: '',
        valid: false,
        //If other fields state depend on this field,
        //it should be included in validates property
        validates: ['confirmPassword'],
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        }
      }
    }
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

  updateInputState = (key, value) => {
    //get the fields that must be updated
    //taking into account that if fields[key] has "validates" property
    //the fields included in validates must be updated as well
    let fieldsNamesToUpdate = [key];
    if (this.state.fields[key].validates) {
      fieldsNamesToUpdate = fieldsNamesToUpdate.concat(this.state.fields[key].validates);
    }

    const fieldsToUpdate = fieldsNamesToUpdate.reduce((acc, val, index) => {
      //get the field[key]
    const field = { ...this.state.fields[val] }

      //get the validation validation rules
      const validationRules = { ...this.state.fields[val].validationRules };

      //equalTo rule points to other field
      //if fields[key] contains equalTo rule
      //equalTo is updated with the value to compare, required by validate()
      //which could be a new value if key === validationRules.equalTo
      //or the value in the state
      if (validationRules.equalTo === key) {
        validationRules.equalTo = value;
      } else if (validationRules.equalTo) {
        validationRules.equalTo = this.state.fields[validationRules.equalTo].value;
      }

      //Update the value only for the fied[key] that called the fuction
      //which allways is the 1st key in fieldsNamesToUpdate
      field.value = index === 0 ? value : field.value;

      return {
        ...acc,
        [val]: {
          ...field, //By including all prev values for the specific
          //key value doesn't need to include all key pairs of the specific key
          value: field.value,
          valid: validate(field.value, validationRules)
        }
      };
    }, {});

    this.setState(prevState => {
      return {
        fields: {
          ...prevState.fields,
          ...fieldsToUpdate
        }
      };
    });
  }

  seeState = () => {
    const keys = Object.keys(this.state.fields);
    alert(`${keys[0]}, ${keys[1]}, ${keys[2]}`);
    keys.forEach(key => {
      const value = this.state.fields[key].value;
      const valid = this.state.fields[key].valid;
      alert(`${key}: ${value}, valid: ${valid}`);
    });
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
            onPress={this.seeState}
            style={styles.button}
          />
          {/*
          By using a container to style the width of the text inputs
          we can now make the textinput reusable accross the app as the width
          is adaptable depending on the container.
          */}
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="E-mail Address"
              style={styles.input}
              value={this.state.fields.email.value}
              onChangeText={val => this.updateInputState('email', val)}
            />
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
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.fields.password.value}
                  onChangeText={val => this.updateInputState('password', val)}
                />
              </View>
              <View
                style={
                  this.state.viewMode === 'portrait'
                  ? styles.portraitPwdWrapp :
                  styles.landscapePwdWrapp
                }
              >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={this.state.fields.confirmPassword.value}
                  onChangeText={val => this.updateInputState('confirmPassword', val)}
                />
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
