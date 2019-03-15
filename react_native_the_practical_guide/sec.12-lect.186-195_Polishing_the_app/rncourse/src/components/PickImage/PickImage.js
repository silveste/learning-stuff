import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  state = {
    pickedImage: null
  }

  reset = () => this.setState({
    pickedImage: null
  })

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: ' Select an image', maxWidth: 800, maxHeight: 600 }, (res) => {
      const { onImagePicked } = this.props;
      if (res.dedCancel) {
        console.log('user cancelled');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: {
            uri: res.uri
          }
        });
        // base64 is used to send the image to the backend
        onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  }

  render() {
    const { pickedImage } = this.state;
    return (
      <React.Fragment>
        <View style={styles.placeholder}>
          <Image source={pickedImage} style={styles.imgPlaceholder} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '100%',
    height: 150
  },
  button: {
    margin: 8
  },
  imgPlaceholder: {
    width: '100%',
    height: '100%'
  }
});

export default PickImage;
