import {React, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import ImageUpload from './ImageUpload';
import VideoUpload from './VideoUpload';
const Temp = [
  {id: 1, title: 'image', isChecked: true},
  {id: 2, title: 'video', isChecked: false},
  {id: 3, title: 'Audio', isChecked: false},
];
const Main = () => {
  const [buttonList, setButtonList] = useState(
    JSON.parse(JSON.stringify(Temp)),
  );
  const [selectedButton, setSelectedButton] = useState(1);

  const handlePressHandler = item => {
    setSelectedButton(item?.id);
    let list = JSON.parse(JSON.stringify(buttonList));
    list.map(e => (e.isChecked = e.id === item.id));
    setButtonList(list);
    console.log(buttonList);
  };
  return (
    <View style={{flex: 1, paddingTop: 50}}>
      <View style={{flex: 0.05, marginBottom: 20}}>
        <FlatList
          data={buttonList}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => handlePressHandler(item)}
                style={{
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: 'red',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: item.isChecked ? 'yellow' : 'green'}}>
                  {item?.title}
                </Text>
              </Pressable>
            );
          }}
          horizontal
        />
      </View>
      <View style={{flex: 0.95}}>
        {selectedButton === 1 && <ImageUpload />}
        {selectedButton === 2 && <VideoUpload />}
      </View>
    </View>
  );
};

export default Main;
