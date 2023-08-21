import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
// import {Camera} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {videoUpload} from './store/uploadSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const VideoUpload = () => {
  const dispatch = useDispatch();
  const vid = useSelector(state => state.upload.uploadVideo);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  useEffect(() => {
    console.log(vid);
  });
  const takeVideoHandler = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
      dispatch(videoUpload(video));
    });
  };

  const uploadVideoHandler = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log('--->', video);
      console.log(video);
      dispatch(videoUpload(video));
    });
  };

  const TimeChange = time => {
    // console.log('--->time', start);
    let parts = time.split(':');
    let minute = parts[0];
    // console.log('minute-->', minute);
    let sec = parts[1];
    // console.log('sec-->', sec);

    let minuteToMilli = minute * 60000;
    let secToMilli = sec * 1000;
    const totalSec = minuteToMilli + secToMilli;
    // console.log('totalSec', totalSec);
    return totalSec;
  };

  const trim = () => {
    const startTime = TimeChange(start);
    const endTime = TimeChange(end);
    if (startTime < endTime) {
    } else {
      Alert.alert('please Select Right time');
    }
  };

  const uploadVideoToServer = async () => {
    console.log('--->', vid.path);
    try {
      const formData = new FormData();
      formData.append('MyFile', {
        uri: vid.path,
        type: 'video/mp4', // Adjust the type according to your image file type
        name: 'video.mp4',
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

      console.log('Video uploaded successfully!', response.data);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{marginBottom: 20}}>
          <Video
            source={{uri: vid?.path}}
            style={styles.video}
            controls={true}
          />
        </View>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Pressable
            onPress={() => takeVideoHandler()}
            style={{
              borderWidth: 2,
              borderRadius: 5,
              width: 110,
              padding: 10,
              marginRight: 10,
            }}>
            <Text>Take Video</Text>
          </Pressable>
          <Pressable
            onPress={() => uploadVideoHandler()}
            style={{borderWidth: 2, borderRadius: 5, width: 120, padding: 10}}>
            <Text>Upload Video</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginRight: 10, marginTop: 10}}>From</Text>
            <TextInput
              placeholder="mm:ss"
              onChangeText={e => {
                setStart(e);
                console.log(start);
              }}
              style={{borderWidth: 1, borderRadius: 5, padding: 10}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginRight: 10, marginTop: 10}}>To</Text>
            <TextInput
              placeholder="mm:ss"
              onChangeText={e => {
                setEnd(e);
                console.log(end);
              }}
              style={{borderWidth: 1, borderRadius: 5, padding: 10}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => trim()}
            style={{
              borderWidth: 2,
              borderRadius: 5,
              width: 110,
              padding: 10,
              marginRight: 10,
            }}>
            <Text>Trim Video</Text>
          </Pressable>
          <Pressable
            onPress={() => uploadVideoToServer()}
            style={{borderWidth: 2, borderRadius: 5, width: 115, padding: 10}}>
            <Text>Upload Video</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
});
export default VideoUpload;
