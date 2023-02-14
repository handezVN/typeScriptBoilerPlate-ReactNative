import {View, Text} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  getValueFromAsyncStorage,
  setValueInAsyncStorage,
} from 'utils/asyncStorage';
type context = {
  watchList: string[];
  storeWatchList: any;
  removeWatchList: any;
};
const Watchlist = createContext<context>({
  watchList: [],
  removeWatchList: () => {},
  storeWatchList: () => {},
});

export const useWatchList = () => useContext(Watchlist);

const WatchlistContext = ({children}: any) => {
  const [watchList, setWatchList] = useState<string[]>([]);
  const getWatchList = async () => {
    try {
      const jsonValue = await getValueFromAsyncStorage('@watchlist_coins');
      setWatchList(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.log(error);
    }
  };
  const storeWatchList = async (coinId: string) => {
    try {
      const newWatchList: string[] = [...watchList, coinId];
      await setValueInAsyncStorage(
        '@watchlist_coins',
        JSON.stringify(newWatchList),
      );
      setWatchList(newWatchList);
    } catch (error) {
      console.log(error);
    }
  };
  const removeWatchList = async (coinId: string) => {
    try {
      const newWatchList = watchList.filter(e => e !== coinId);
      await setValueInAsyncStorage(
        '@watchlist_coins',
        JSON.stringify(newWatchList),
      );
      setWatchList(newWatchList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWatchList();
  }, []);
  return (
    <Watchlist.Provider value={{watchList, storeWatchList, removeWatchList}}>
      {children}
    </Watchlist.Provider>
  );
};

export default WatchlistContext;
