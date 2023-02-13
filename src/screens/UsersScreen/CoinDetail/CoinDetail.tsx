import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
const CoinDetail = ({route, navigation}: any) => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const item: CoinType = route.params.coin;
  const [coin, setCoin] = useState();
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const data = await api.getDetailedCoinData(item.id);
    const marketData = await api.getCoinMarketChart(item.id, 1);
    setCoin(data);
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
  const CoinDetailHeader = ({item}: {item: CoinType}) => {
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
            source={{uri: coin?.image.thumb}}
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
  const RenderTitle = ({item}: {item: CoinType}) => {
    return (
      <>
        <RobotoText>{item.name}</RobotoText>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RobotoText style={{fontSize: 20}}>
            {coin.market_data.current_price.usd.toFixed(2)} US$
          </RobotoText>
          <View style={[styles.coinBox, {backgroundColor: stageColor}]}>
            <Icon name="caretdown" size={10} color={Colors.text}></Icon>
            <RobotoText style={{marginLeft: 5}}>
              {item.price_change_percentage_24h?.toFixed(2)}%
            </RobotoText>
          </View>
        </View>
      </>
    );
  };
  const Chart = ({item}: {item: any}) => {
    const data = item.prices.map((x: any) => ({
      timestamp: x[0],
      value: x[1],
    }));
    return (
      <GestureHandlerRootView>
        <LineChart.Provider data={data}>
          <LineChart>
            <LineChart.Path color={stageColor} />
            <LineChart.CursorCrosshair color={Colors.text}>
              <LineChart.Tooltip textStyle={{color: Colors.text}} />
              <LineChart.Tooltip position="bottom">
                <LineChart.DatetimeText style={{color: Colors.text}} />
              </LineChart.Tooltip>
            </LineChart.CursorCrosshair>
          </LineChart>
        </LineChart.Provider>
      </GestureHandlerRootView>
    );
  };
  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <View style={{padding: 20}}>
      <CoinDetailHeader item={item} />
      <RenderTitle item={item} />
      <Chart item={coinMarketData} />
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
});
