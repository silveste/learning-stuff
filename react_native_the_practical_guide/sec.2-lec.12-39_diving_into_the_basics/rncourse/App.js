/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, } from 'react-native';

import ListView from './src/components/ListView/ListView';
import InputView from './src/components/InputView/InputView';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    places: []
  };

  handleSubmit = val => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat(val)
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <InputView onSubmit = {this.handleSubmit}/>
        <ListView places = {this.state.places} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }
});
