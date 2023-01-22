import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {dimen_x} from 'utils/dimes';
import {RobotoText} from 'components/TextStyle/RobotoText';

const WelcomeItem = () => {
  return (
    <View style={{paddingHorizontal: dimen_x(44 / 375)}}>
      <Image
        source={require('../../assets/images/1.png')}
        style={{width: '100%', height: 300}}
        resizeMode="contain"
      />
      <Text></Text>
      <RobotoText
        style={{
          fontSize: dimen_x(14 / 375),
          fontWeight: '700',
        }}>
        Trồng cây một bước tiến tới cuộc sống lành mạnh
      </RobotoText>
    </View>
  );
};

export default WelcomeItem;

const styles = StyleSheet.create({});
