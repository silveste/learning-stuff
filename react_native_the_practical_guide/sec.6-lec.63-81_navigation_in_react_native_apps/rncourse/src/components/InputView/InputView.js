import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class InputView extends Component {
  state = {
    placeName: ''
  }

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    });
  }

  placeSubmitHandler = () => {
    /*
    Trim always return a string therefore also prevent input values to be parsed
    as a different type than string
    */
    const val = this.state.placeName.trim();
    if (val) {
      this.setState({ placeName: '' });
      return this.props.onSubmit(val);
    }
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder='An Awesome Place'
          value={this.state.placeName}
          onChangeText={this.placeNameChangeHandler}
        />
        <Button
          style={styles.inputButton}
          title='Add'
          onPress={this.placeSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 10,
  },
  inputText: {
    flex: 6
  },
  inputButton: {
    flex: 3
  }
});
