import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component {
  loginHandler = () => {
    //Check for Auth

    //If auth show main tabs
    startMainTabs();
  }
  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
        <Button
          title="Login"
          onPress={this.loginHandler}
        />
      </View>
    );
  }
}

export default AuthScreen;
