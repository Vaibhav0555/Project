import {React, useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {photoUpload} from './store/uploadSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const ImageUpload = () => {
  const dispatch = useDispatch();
  const pic = useSelector(state => state.upload.uploadPhoto);
  useEffect(() => {
    console.log(pic);
  });
  const takePhotoHandler = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      const uri = image;
      dispatch(photoUpload(uri));
    });
  };

  const uploadPhotoHandler = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      const uri = image;
      dispatch(photoUpload(uri));
    });
  };

  const uploadImageToServer = async () => {
    console.log(pic.path);
    try {
      const formData = new FormData();
      formData.append('MyFile', {
        uri: pic.path,
        type: 'image/jpeg', // Adjust the type according to your image file type
        name: 'image.jpg',
      });

      const response = await axios.post(
        'https://08d4-2401-4900-1c5c-5861-b805-5068-d3cb-b143.ngrok-free.app/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any other headers if required
          },
        },
      );

      console.log('Image uploaded successfully!', response.data);
      Alert.alert('Image uploaded sucessfully');
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <ImageBackground
          style={{width: 500, height: 500}}
          source={{uri: pic?.path}}></ImageBackground>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => takePhotoHandler()}
          style={{
            borderWidth: 2,
            borderRadius: 5,
            width: 100,
            padding: 10,
            marginRight: 20,
          }}>
          <Text>Take Photo</Text>
        </Pressable>
        <Pressable
          onPress={() => uploadPhotoHandler()}
          style={{borderWidth: 2, borderRadius: 5, width: 115, padding: 10}}>
          <Text>Upload Photo</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => uploadImageToServer()}
        style={{borderWidth: 2, borderRadius: 5, width: 115, padding: 10}}>
        <Text>Upload Photo</Text>
      </Pressable>
    </View>
  );
};
export default ImageUpload;
