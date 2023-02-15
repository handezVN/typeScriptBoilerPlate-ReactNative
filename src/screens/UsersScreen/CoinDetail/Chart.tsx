import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LineChart} from 'react-native-wagmi-charts';
import {useTheme} from '@react-navigation/native';
import {DarkMode, LightMode} from 'constants/colors';
const Chart = ({item, stageColor}: {item: any; stageColor: any}) => {
  console.log('Render Chart');
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const data = item
    ? item.prices.map((x: any) => ({
        timestamp: x[0],
        value: x[1],
      }))
    : '';
  return data !== '' ? (
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
  ) : (
    <></>
  );
};

export default memo(Chart);

const styles = StyleSheet.create({});
