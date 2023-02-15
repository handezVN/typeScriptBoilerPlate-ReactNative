import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {RobotoText} from 'components/RobotoText/RobotoText';
import {CoinType} from '../CoinItem/CoinItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import {LineChart} from 'react-native-wagmi-charts';
import crypto from '../../../assets/DATA/crypto.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as api from 'src/services/request';
import CoinDetailHeader from './CoinDetailHeader';
import RenderTitle from './RenderTitle';
import Chart from './Chart';
const CoinDetail = ({route, navigation}: any) => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const item: CoinType = route.params.coin;
  const [coin, setCoin] = useState<any>();
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    const data = await api.getDetailedCoinData(item.id);
    const marketData = await api.getCoinMarketChart(item.id, 1);
    setCoin(data);
    setCoinMarketData(marketData);
    setLoading(false);
  };
  const fetchDataMarket = async (number: string | number, daily?: string) => {
    setLoading(true);
    const marketData = await api.getCoinMarketChart(item.id, number, daily);
    setCoinMarketData(marketData);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const stageColor =
    item.price_change_percentage_24h && item.price_change_percentage_24h < 0
      ? '#ea3943'
      : '#16c784';

  const FilterChart = () => {
    console.log('Render FilterChart');

    const FilterData = [
      {
        title: '24h',
        onPress: () => {
          fetchDataMarket(1);
        },
      },
      {
        title: '7d',
        onPress: () => {
          fetchDataMarket(7);
        },
      },
      {
        title: '30d',
        onPress: () => {
          fetchDataMarket(30);
        },
      },
      {
        title: '1y',
        onPress: () => {
          fetchDataMarket(365, 'daily');
        },
      },
      {
        title: 'All',
        onPress: () => {
          fetchDataMarket('max', 'daily');
        },
      },
      {
        title: 'line',
        onPress: () => {},
      },
    ];
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'grey',
          justifyContent: 'space-between',
          padding: 10,
          borderRadius: 5,
        }}>
        {FilterData.map((e, index) => {
          return (
            <TouchableOpacity
              style={
                index === filter ? styles.filterActive : styles.filterInActive
              }
              key={index}
              onPress={() => {
                setFilter(index);
                e.onPress();
              }}>
              <Text
                style={[
                  {color: 'white', textAlign: 'center'},
                  index !== filter && {color: '#FAFAFAF'},
                ]}>
                {e.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{padding: 20}}>
      {loading ||
        !coin ||
        (!coinMarketData && (
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} />
          </View>
        ))}

      <GestureHandlerRootView>
        <CoinDetailHeader item={item} navigation={navigation} />
        <FilterChart />
        <RenderTitle item={item} coin={coin} stageColor={stageColor} />
        <Chart item={coinMarketData} stageColor={stageColor} />
      </GestureHandlerRootView>
    </View>
  );
};

export default CoinDetail;

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
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
