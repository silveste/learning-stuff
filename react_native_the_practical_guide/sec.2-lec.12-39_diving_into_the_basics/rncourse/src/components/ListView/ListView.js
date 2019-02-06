import React from 'react';
import { View, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const listView = (props) => {
  const placesList = props.places.map((place, i) => (
    <ListItem
      key={i}
      placeName={place}
      onItemPressed={() => props.onItemDeleted(i)}
    />
  ));
  return (
    <View
      style={styles.listContainer}
    >
      {placesList}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
      width: '100%'
  }
});

export default listView;
