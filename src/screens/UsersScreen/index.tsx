import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
import {RobotoText} from 'components/RobotoText/RobotoText';
import CoinItem, {CoinType} from './CoinItem/CoinItem';
import CrytoCurrencies from '../../assets/DATA/cryptocurrencies.json';
const UsersScreen = ({navigation}: any) => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;

  return (
    <SafeAreaView>
      <FlatList
        data={CrytoCurrencies}
        renderItem={({item, index}) => (
          <CoinItem item={item} navigation={navigation}></CoinItem>
        )}
        keyExtractor={e => `${e.id}`}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;
