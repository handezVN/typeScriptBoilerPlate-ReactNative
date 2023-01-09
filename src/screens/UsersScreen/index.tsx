import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const UsersScreen = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        allowsInlineMediaPlayback={true}
        cacheEnabled={true}
        geolocationEnabled={false}
        javaScriptEnabled
        javaScriptEnabledAndroid={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode={'compatibility'}
        originWhitelist={['*']}
        scalesPageToFit
        startInLoadingState={true}
        useWebkit
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        style={{flex: 1, width: '100%'}}
      />
    </View>
  );
};

export default UsersScreen;
