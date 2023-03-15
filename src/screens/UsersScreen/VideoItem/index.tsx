import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-player';
import AutoHeightImage from 'react-native-auto-height-image';
import {ScreenWidth} from 'utils/dimen';

export type VideoPlayerProps = {
  id: number;
  url: string;
  title: string;
};
const VideoItem = (item: VideoPlayerProps | any, onPress: any) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(item)}>
        <AutoHeightImage
          source={{
            uri: 'https://picsum.photos/1600/900',
          }}
          width={ScreenWidth}
        />
      </TouchableOpacity>
      <View>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
};

export default VideoItem;
