import {
  View,
  Text,
  TouchableOpacity,
  ButtonProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {dimen_x, dimen_y, SCREEN_WIDTH} from 'utils/dimes';
import styles from 'screens/SettingsScreen/styles';

const Button = ({
  title,
  onClick,
  style,
}: {
  title: string;
  onClick: any;
  style: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        {
          marginHorizontal: dimen_x(16 / 375),
          borderRadius: 8,
          width: '100%',
          height: dimen_y(40 / 812),
          backgroundColor: '#97C15C',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        },
        style,
      ]}>
      <Text
        style={{
          fontFamily: 'Roboto',
          fontWeight: '600',
          fontSize: dimen_x(16 / 375),
          color: 'white',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
