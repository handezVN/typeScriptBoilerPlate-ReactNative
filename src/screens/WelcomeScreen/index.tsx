import {
  FlatList,
  FlatListProps,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import WelcomeItem from './WelcomeItem';
import {dimen_x, dimen_y, SCREEN_WIDTH} from 'utils/dimes';
import {useSelector} from 'react-redux';
import {globalStore} from 'store/store';
import {useTheme} from '@react-navigation/native';
import Image1 from '../../assets/images/1.png';
import Image2 from '../../assets/images/2.png';
import Image3 from '../../assets/images/3.png';
import {Colors} from 'utils/useColor';

const Data = [
  {
    id: 1,
    title: 'Trồng cây một bước tiến tới cuộc sống lành mạnh',
    image: Image1,
  },
  {
    id: 2,
    title:
      'Chúng tôi có những loại cây tốt nhất với giá tốt nhất và nhiều loại cây chỉ dành cho bạn',
    image: Image2,
  },
  {
    id: 3,
    title:
      'Trang trí nhà của bạn với những chậu cây đẹp nhất và lộng lẫy với giá tốt nhất để làm xanh cuộc sống của bạn',
    image: Image3,
  },
];
const WelcomeScreen = ({onPress}: {onPress: any}) => {
  const [index, setIndex] = useState<number>(0);
  const ref: any = useRef();
  const onClick = () => {
    index !== 2 ? ref.current.scrollToIndex({index: index + 1}) : onPress();
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginTop: dimen_y(160 / 812)}}>
          <FlatList
            data={Data}
            initialNumToRender={1}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={(data: any) => {
              const {item, index} = data;
              return <WelcomeItem image={item.image} title={item.title} />;
            }}
            keyExtractor={(item, index) => `${item.id}+${index}`}
            onScroll={e => {
              let offset: number = e.nativeEvent.contentOffset.x;
              let page: number = Math.round(offset / SCREEN_WIDTH); // your cell height
              if (page !== index) setIndex(page);
            }}
            ref={ref}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: dimen_y(116 / 812),
            width: SCREEN_WIDTH,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 24,
            }}>
            <View
              style={[
                styles.pageStyle,
                index === 0 && {backgroundColor: Colors.primary, width: 24},
              ]}></View>
            <View
              style={[
                styles.pageStyle,
                index === 1 && {backgroundColor: Colors.primary, width: 24},
              ]}></View>
            <View
              style={[
                styles.pageStyle,
                index === 2 && {backgroundColor: Colors.primary, width: 24},
              ]}></View>
          </View>
          <TouchableOpacity
            onPress={onClick}
            style={{
              marginHorizontal: dimen_x(16 / 375),
              borderRadius: 8,
              width: SCREEN_WIDTH - 32,
              height: dimen_y(40 / 812),
              backgroundColor: '#97C15C',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontWeight: '600',
                fontSize: dimen_x(16 / 375),
                color: 'white',
              }}>
              {index === 2 ? 'Bắt đầu' : 'Tiếp tục'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  pageStyle: {
    height: 4,
    width: 8,
    backgroundColor: '#D9D9D9',
    borderRadius: 70,
    marginHorizontal: 2,
  },
  pageSelectedStyle: {
    width: 24,
  },
});
