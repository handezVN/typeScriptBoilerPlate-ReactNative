import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import {RobotoText} from 'components/RobotoText/RobotoText';
import {NativeModules, Button} from 'react-native';
import CalendarModule from 'src/nativeInterface/android/CalendarModule';
const UsersScreen = () => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const onPress = () => {
    console.log('We will invoke the native module here!');
    console.log(CalendarModule.createCalendarEvent('123', '455'));
  };
  return (
    <SafeAreaView>
      <RobotoText style={{color: Colors.text}}>UsersScreen</RobotoText>
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;
