import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  PanResponder,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {ScreenWidth, WINDOW_HEIGHT} from 'utils/dimen';
import VideoPlayer from 'react-native-video-player';
import {videoData} from 'utils/DataVideo';
import VideoItem, {VideoPlayerProps} from './VideoItem';
import Video from 'react-native-video';
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT - 70;
const BOTTOM_SHEET_MIN_HEIGHT = 70;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const DraggableBottomSheet = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;
  console.log(animatedValue);
  const videoHeight = useRef(new Animated.Value(0)).current;
  const springAnimation = (direction: 'up' | 'down') => {
    console.log('direction', direction);
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    const height = direction === 'down' ? 100 : 500;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
    Animated.spring(videoHeight, {
      toValue: height,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const bottomVideoAnimation = animatedValue.interpolate({
    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
    outputRange: [400, 100],
    extrapolate: 'clamp',
  });
  const [item, setItem] = useState<VideoPlayerProps>();
  const runVideo = (item: VideoPlayerProps) => {
    setItem(item);
    springAnimation('up');
  };
  console.log(bottomVideoAnimation);
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 50}}>
        <FlatList
          data={videoData}
          keyExtractor={e => `${e.id}`}
          renderItem={item => VideoItem(item.item, runVideo)}
        />
      </View>
      {item && (
        <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
          <View style={styles.draggableArea} {...panResponder.panHandlers}>
            <View style={styles.dragHandle}>
              <Animated.View
                style={[{height: 400}, {height: bottomVideoAnimation}]}>
                <Video
                  source={{uri: item.url}} // Can be a URL or a local file.
                  style={[{width: '100%', height: '100%'}]}
                />
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: 'grey',
  },
  draggableArea: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenWidth,
  },
  dragHandle: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    width: ScreenWidth,
  },
});

export default DraggableBottomSheet;
