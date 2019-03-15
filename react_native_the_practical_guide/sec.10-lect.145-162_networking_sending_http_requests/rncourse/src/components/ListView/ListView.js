import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const listView = (props) => {
  const { onItemSelected, places } = props;
  return (
    <FlatList
      style={styles.listContainer}
      data={places}
      renderItem={info => (
        <ListItem
          /*
            I'm not sure why info object has item property
            which stores places array
            TODO: check ListItem documentation
          */
          placeName={info.item.placeName}
          placeImage={info.item.image}
          onItemPressed={() => onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default listView;
