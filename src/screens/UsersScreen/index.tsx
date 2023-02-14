import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import {RobotoText} from 'components/RobotoText/RobotoText';
import CoinItem, {CoinType} from './CoinItem/CoinItem';
import {getMarketData, getMarketDataWithSize} from 'src/services/request';
const UsersScreen = ({navigation}: any) => {
  const {dark, colors} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [loading, setLoading] = useState(false);
  const [toggled, setToggled] = useState(false);
  const fetchCoins = async (pageNumber?: number) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    // console.log(coinsData);
    console.log('load');
    setCoins((existingCoins): any => [...existingCoins, ...coinsData]);
    setLoading(false);
  };
  const refetchCoins = async () => {
    const coinsData = await getMarketDataWithSize(coins.length);
    console.log('load');
    coinsData.forEach((element: CoinType, index: number) => {
      const {
        price_change_percentage_24h,
        id,
        symbol,
        image,
        name,
        market_cap_rank,
        current_price,
        market_cap,
      } = element;
      coins[index] = {
        ...coins[index],
        ...{
          price_change_percentage_24h,
          id,
          symbol,
          image,
          name,
          market_cap_rank,
          current_price,
          market_cap,
        },
      };
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      refetchCoins();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={coins}
        renderItem={({item, index}) => (
          <CoinItem item={item} navigation={navigation}></CoinItem>
        )}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={() => {
              setLoading(false);
              refetchCoins();
            }}
          />
        }
        keyExtractor={(e, index) => `${e.id}${index}`}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;
