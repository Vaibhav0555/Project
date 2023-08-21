import {React, useEffect, useState} from 'react';
import {View, Text, Pressable, Image, ImageBackground} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {photoUpload} from './store/uploadSlice';
import {useDispatch, useSelector} from 'react-redux';

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

      <Pressable
        onPress={() => takePhotoHandler()}
        style={{
          borderWidth: 2,
          borderRadius: 5,
          width: 100,
          padding: 10,
          marginBottom: 20,
        }}>
        <Text>Take Photo</Text>
      </Pressable>
      <Pressable
        onPress={() => uploadPhotoHandler()}
        style={{borderWidth: 2, borderRadius: 5, width: 115, padding: 10}}>
        <Text>Upload Photo</Text>
      </Pressable>
    </View>
  );
};
export default ImageUpload;
