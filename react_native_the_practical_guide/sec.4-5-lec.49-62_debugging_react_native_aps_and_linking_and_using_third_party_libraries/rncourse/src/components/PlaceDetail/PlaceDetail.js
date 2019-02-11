import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';


//See https://github.com/oblador/react-native-vector-icons for more instructions on how to install
// this 3rd party library
//Once fullfilled steps for Android/Ios we can import the whole library or only the part that
//content the icons that we want
import Icon from 'react-native-vector-icons/Ionicons';

const placedetail = props => {
  let modalContent = null;

  if (props.selectedPlace) {
    modalContent = (
      <View>
        <Image source={props.selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
    );
  }
  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedPlace !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity onPress={props.onItemDeleted}>
            <View style={styles.deleteButton}>
              <Icon size={30} name='md-trash' color='red' />
            </View>
          </TouchableOpacity>

          <Button title='Close' onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    margin: 5
  },
  deleteButton: {
    alignItems: 'center'
  }
});
export default placedetail;
