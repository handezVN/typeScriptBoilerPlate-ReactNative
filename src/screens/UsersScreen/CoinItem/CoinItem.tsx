import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {RobotoText} from 'components/RobotoText/RobotoText';
import {useNavigation, useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useWatchList} from 'context/CoinsContext';
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
  const {
    price_change_percentage_24h,
    id,
    symbol,
    image,
    name,
    market_cap_rank,
    current_price,
    market_cap,
  } = item;
  const normalizeMarketCap = (marketCap: any) => {
    if (marketCap > 1_000_000_000_000)
      return `${Math.floor(marketCap / 1_000_000_000_000)} T`;
    if (marketCap > 1_000_000_000)
      return `${Math.floor(marketCap / 1_000_000_000)} B`;
    if (marketCap > 1_000_000) return `${Math.floor(marketCap / 1_000_000)} M`;
    if (marketCap > 1_000) return `${Math.floor(marketCap / 1_000)} K`;
    return marketCap;
  };
  const {watchList, storeWatchList, removeWatchList} = useWatchList();
  const stageColor =
    price_change_percentage_24h && price_change_percentage_24h < 0
      ? '#ea3943'
      : '#16c784' || Colors.text;
  const goDetail = () => {
    navigation.navigate('CoinDetail', {coin: item});
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 20,
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={goDetail} style={{flexDirection: 'row'}}>
        <Image
          source={{uri: image}}
          style={{height: 40, width: 40, borderRadius: 100}}
        />
        <View style={{marginLeft: 10}}>
          <RobotoText>{name}</RobotoText>
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
              <RobotoText>{market_cap_rank}</RobotoText>
            </View>
            <RobotoText style={{color: 'grey', marginLeft: 5}}>
              {symbol && symbol.toUpperCase()}
            </RobotoText>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Icon name="caretdown" size={12} color={stageColor}></Icon>
            </View>
            <RobotoText style={{color: 'grey', marginLeft: 5}}>
              {price_change_percentage_24h?.toFixed(2)}%
            </RobotoText>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View>
          <RobotoText style={{alignSelf: 'flex-end'}}>
            {current_price} $
          </RobotoText>
          <RobotoText style={{color: 'grey', alignSelf: 'flex-end'}}>
            MCap {normalizeMarketCap(market_cap)}
          </RobotoText>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
          onPress={() =>
            watchList.includes(id) ? removeWatchList(id) : storeWatchList(id)
          }>
          <Icon
            name="star"
            size={20}
            color={watchList.includes(id) ? 'yellow' : Colors.primary}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(CoinItem);

const styles = StyleSheet.create({});
