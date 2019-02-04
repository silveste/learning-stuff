/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import ListItem from './src/components/ListItem/ListItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    placeName: '',
    places: []
  };

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    //Prevent input values to be parsed as a different value than string
    const val = this.state.placeName.trim();
    if (val) {
      this.setState(prevState => {
        return {
          places: prevState.places.concat(val),
          placeName: ''
        };
    });
    }
  }

  render() {
    const placesList = this.state.places.map( (place, i) => (
      <ListItem key={i} placeName={place} />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder = "An Awesome Place"
            value={this.state.placeName}
            onChangeText = {this.placeNameChangeHandler}/>
          <Button
            style={styles.inputButton}
            title = "Add"
            onPress = {this.placeSubmitHandler}
          />
        </View>
        <View
          style = {styles.listContainer}
        >
          {placesList}
        </View>
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
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 10,
  },
  listContainer: {
      width: '100%'
  },
  inputText: {
    width: '70%'
  },
  inputButton: {
    width: '20%'
  }
});
