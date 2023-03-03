import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import * as React from 'react';
import {Text, TextProps} from 'react-native';

export function InterText(props: TextProps) {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  return <Text {...props} style={[{color: Colors.text}, props.style]} />;
}
