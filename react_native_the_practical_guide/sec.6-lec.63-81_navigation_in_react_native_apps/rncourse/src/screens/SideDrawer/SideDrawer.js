import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class SideDrawer extends Component {
  render() {
    return (
      //A dimension is required by android devices, otherwise the app crashes
      <View
        style={[
          { width: Dimensions.get('window').width * 0.8 },
          styles.container
        ]}
      >
        <Text>Side Drawer</Text>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      paddingTop: 22,
      backgroundColor: 'white',
      flex: 1
    }
  });
export default SideDrawer;
