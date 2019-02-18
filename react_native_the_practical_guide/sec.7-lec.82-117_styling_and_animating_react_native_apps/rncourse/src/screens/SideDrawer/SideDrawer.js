import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

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
        <TouchableOpacity>
          <View style={styles.drawerRow}>
            <Icon
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color='#444'
              style={styles.icon}
            />
            <Text>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      backgroundColor: 'white',
      flex: 1
    },
    drawerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#eee'
    },
    icon: {
      marginRight: 10
    }
  });
export default SideDrawer;
