import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {RobotoText} from 'components/RobotoText/RobotoText';
import {useNavigation, useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
export type CoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string;
  roi: any;
  last_updated: string;
};

const CoinItem = ({item, navigation}: {item: CoinType; navigation: any}) => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const normalizeMarketCap = (marketCap: any) => {
    if (marketCap > 1_000_000_000_000)
      return `${Math.floor(marketCap / 1_000_000_000_000)} T`;
    if (marketCap > 1_000_000_000)
      return `${Math.floor(marketCap / 1_000_000_000)} B`;
    if (marketCap > 1_000_000) return `${Math.floor(marketCap / 1_000_000)} M`;
    if (marketCap > 1_000) return `${Math.floor(marketCap / 1_000)} K`;
    return marketCap;
  };
  const stageColor =
    item.price_change_percentage_24h && item.price_change_percentage_24h < 0
      ? '#ea3943'
      : '#16c784';
  const goDetail = () => {
    navigation.navigate('CoinDetail', {coin: item});
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        padding: 20,
        width: '100%',
        justifyContent: 'space-between',
      }}
      onPress={goDetail}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.image}}
          style={{height: 40, width: 40, borderRadius: 100}}
        />
        <View style={{marginLeft: 10}}>
          <RobotoText>{item.name}</RobotoText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Colors.backgroundColor,
                height: 20,
                width: 25,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <RobotoText>{item.market_cap_rank}</RobotoText>
            </View>
            <RobotoText style={{color: 'grey', marginLeft: 5}}>
              {item.symbol && item.symbol.toUpperCase()}
            </RobotoText>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Icon name="caretdown" size={12} color={stageColor}></Icon>
            </View>
            <RobotoText style={{color: 'grey', marginLeft: 5}}>
              {item.price_change_percentage_24h?.toFixed(2)}%
            </RobotoText>
          </View>
        </View>
      </View>
      <View>
        <RobotoText style={{alignSelf: 'flex-end'}}>
          {item.current_price} $
        </RobotoText>
        <RobotoText style={{color: 'grey', alignSelf: 'flex-end'}}>
          MCap {normalizeMarketCap(item.market_cap)}
        </RobotoText>
      </View>
    </TouchableOpacity>
  );
};

export default CoinItem;

const styles = StyleSheet.create({});
