import * as React from 'react';
import {Text, StyleSheet, TextProps, Platform} from 'react-native';

export function RobotoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{fontFamily: 'Roboto', color: 'black'}, props.style]}
    />
  );
}
