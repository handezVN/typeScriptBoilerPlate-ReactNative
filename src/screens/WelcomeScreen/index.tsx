import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WelcomeItem from './WelcomeItem';
import {dimen_x} from 'utils/dimes';

const Data = [
  {title: 'Trồng cây một bước tiến tới cuộc sống lành mạnh', image: '1.png'},
  {
    title:
      'Chúng tôi có những loại cây tốt nhất với giá tốt nhất và nhiều loại cây chỉ dành cho bạn',
    image: '3.png',
  },
  {
    title:
      'Trang trí nhà của bạn với những chậu cây đẹp nhất và lộng lẫy với giá tốt nhất để làm xanh cuộc sống của bạn',
    image: '2.png',
  },
];
const WelcomeScreen = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <SafeAreaView>
        <Text>WelcomeScreen </Text>
        <WelcomeItem></WelcomeItem>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
