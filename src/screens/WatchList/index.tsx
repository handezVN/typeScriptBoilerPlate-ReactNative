import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CoinItem, {CoinType} from 'screens/UsersScreen/CoinItem/CoinItem';
import CrytoCurrencies from '../../assets/DATA/cryptocurrencies.json';
import {useWatchList} from '../../Contexts/CoinsContext';
import {getWatchlistedCoins} from 'src/services/request';
const WatchListScreen = ({navigation}: any) => {
  const {watchList} = useWatchList();
  const transformCoinIds = () => watchList.join('%2C');
  const [loading, setLoading] = useState(false);
  const [watchlist, setCoins] = useState<CoinType[]>();
  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(
      1,
      transformCoinIds(),
    );
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchList.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchList]);
  return (
    <SafeAreaView>
      <FlatList
        data={watchlist}
        renderItem={({item, index}) =>
          watchList.includes(item.id) ? (
            <CoinItem item={item} navigation={navigation}></CoinItem>
          ) : (
            <></>
          )
        }
        keyExtractor={e => `${e.id}`}
      />
    </SafeAreaView>
  );
};

export default WatchListScreen;
