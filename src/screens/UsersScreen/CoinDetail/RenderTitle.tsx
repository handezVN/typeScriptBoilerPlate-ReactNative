import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {CoinType} from '../CoinItem/CoinItem';
import {RobotoText} from 'components/RobotoText/RobotoText';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
const RenderTitle = ({
  item,
  coin,
  stageColor,
}: {
  item: CoinType;
  coin: any;
  stageColor: string;
}) => {
  console.log('Render Title');
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  return (
    <>
      <RobotoText>{item.name}</RobotoText>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RobotoText style={{fontSize: 20}}>
          {coin && coin.market_data.current_price.usd.toFixed(2)} US$
        </RobotoText>
        <View style={[styles.coinBox, {backgroundColor: stageColor}]}>
          <Icon name="caretdown" size={10} color={Colors.text}></Icon>
          <RobotoText style={{marginLeft: 5}}>
            {item && item.price_change_percentage_24h?.toFixed(2)}%
          </RobotoText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  coinBox: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  filterActive: {
    backgroundColor: 'black',
    padding: 5,
    width: 40,
    borderRadius: 5,
  },
  filterInActive: {
    padding: 5,
    width: 40,
    borderRadius: 5,
  },
});

export default memo(RenderTitle);
