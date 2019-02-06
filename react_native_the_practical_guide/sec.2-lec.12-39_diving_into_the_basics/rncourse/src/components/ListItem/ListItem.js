import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image source={props.placeImage} style={styles.image} resizeMode='contain' />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#eee'
  },
  image: {
    marginRight: 8,
    maxHeight: 30,
    width: 30
  }
});

export default listItem;
