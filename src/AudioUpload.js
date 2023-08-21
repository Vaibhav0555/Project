import {View, Text, Button, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {audioUpload} from './store/uploadSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
const AudioUpload = () => {
  const dispatch = useDispatch();
  const aud = useSelector(state => state.upload.uploadAudio);
  const chooseAudio = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      console.log('result-->', result);
      dispatch(audioUpload(result[0]));
      console.log('--aud-->', aud);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.error('Error selecting audio:', error);
      }
    }
  };

  const uploadAudioToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('MyFile', {
        uri: aud.uri,
        type: 'audio/mpeg',
        name: aud.name,
      });

      const response = await axios.post(
        'https://08d4-2401-4900-1c5c-5861-b805-5068-d3cb-b143.ngrok-free.app/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Audio uploaded successfully!', response.data);
      Alert.alert('Audio uploaded sucessfully');
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <View>
      <Button title="Select Audio" onPress={chooseAudio} />
      {aud && (
        <Pressable
          onPress={() => uploadAudioToServer()}
          style={{borderWidth: 2, borderRadius: 5, width: 115, padding: 10}}>
          <Text>Upload Video</Text>
        </Pressable>
      )}
    </View>
  );
};

export default AudioUpload;
