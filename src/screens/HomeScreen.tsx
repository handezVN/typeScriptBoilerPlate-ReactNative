import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const HomeScreen = () => {
  return (
    <View>
      <WebView source={{uri: 'https://reactnative.dev/'}} />
    </View>
  );
};

export default HomeScreen;
