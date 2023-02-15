import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import {CoinType} from '../CoinItem/CoinItem';
import {RobotoText} from 'components/RobotoText/RobotoText';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
const CoinDetailHeader = ({
  item,
  navigation,
}: {
  item: CoinType;
  navigation: any;
}) => {
  console.log('Render CoinDetailHeader');
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  return (
    <View
      style={{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="left" size={16} color={Colors.text}></Icon>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item?.image}}
          style={{height: 20, width: 20, borderRadius: 100}}></Image>
        <RobotoText style={{marginHorizontal: 5}}>
          {item.symbol.toUpperCase()}
        </RobotoText>

        <View
          style={{
            backgroundColor: Colors.backgroundColor,
            paddingHorizontal: 5,
            borderRadius: 5,
          }}>
          <RobotoText>#{item.market_cap_rank}</RobotoText>
        </View>
      </View>
      <View
        style={{
          borderRadius: 50,
          borderColor: Colors.text,
          borderWidth: 1,
          padding: 4,
        }}>
        <Icon name="user" size={16} color={Colors.text}></Icon>
      </View>
    </View>
  );
};

export default memo(CoinDetailHeader);
