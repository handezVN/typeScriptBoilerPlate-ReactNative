import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import {RobotoText} from 'components/RobotoText/RobotoText';
const UsersScreen = () => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  return (
    <SafeAreaView>
      <RobotoText style={{color: Colors.text}}>UsersScreen</RobotoText>
    </SafeAreaView>
  );
};

export default UsersScreen;
