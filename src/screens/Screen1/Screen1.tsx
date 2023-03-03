import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {InterText} from 'components/InterText/InterText';
import ChatIcon from '../../assets/Svgs/ChatIcon';
import FilterIcon from '../../assets/Svgs/FilterIcon';
import MasonryList from '@react-native-seoul/masonry-list';
import AutoHeightImage from 'react-native-auto-height-image';
export class Screen1 extends Component {
  Data = [
    {title: 'Vlogging', image: require('../../assets/Images/1.png')},
    {title: 'Cooking', image: require('../../assets/Images/3.png')},
    {title: 'Entertainment', image: require('../../assets/Images/5.png')},
  ];
  Data2 = [
    {title: 'Dancing', image: require('../../assets/Images/2.png')},
    {title: 'Education', image: require('../../assets/Images/4.png')},
    {title: 'Tourism', image: require('../../assets/Images/6.png')},
  ];
  Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <InterText style={{fontSize: 18, fontWeight: '600'}}>Steps</InterText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ChatIcon />
          <Image
            source={require('../../assets/Images/avatar.png')}
            style={{
              height: 48,
              width: 48,
              borderRadius: 50,
              backgroundColor: '#B4DDDD',
              marginLeft: 18,
            }}
          />
        </View>
      </View>
    );
  };
  Tab = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 24,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.tabStyle, styles.tabActive, {marginRight: 12}]}>
            <InterText style={[styles.tabText, styles.tabTextActive]}>
              Category
            </InterText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabStyle}>
            <InterText style={styles.tabText}>Progress</InterText>
          </TouchableOpacity>
        </View>
        <FilterIcon />
      </View>
    );
  };
  RenderItem = (item: any, index: number) => {
    console.log(index);
    return (
      <View key={index} style={{position: 'relative'}}>
        <AutoHeightImage
          width={157}
          source={item.image}
          style={{marginBottom: 10}}
        />
        <InterText
          style={{
            position: 'absolute',
            left: 10,
            bottom: 30,
            fontSize: 16,
            fontWeight: '600',
            color: '#FFF',
          }}>
          {item.title}
        </InterText>
      </View>
    );
  };

  Container = () => {
    return (
      <ScrollView style={{marginBottom: 200, marginTop: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            {this.Data.map((item, index): any => {
              return this.RenderItem(item, index);
            })}
          </View>
          <View style={{marginLeft: 12}}>
            {this.Data2.map((item, index): any => {
              return this.RenderItem(item, index + 1000);
            })}
          </View>
        </View>
      </ScrollView>
    );
  };
  render() {
    return (
      <SafeAreaView>
        <View style={{padding: 24}}>
          <this.Header />
          <this.Tab />
          <this.Container />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  tabActive: {
    backgroundColor: '#246BFD',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#5E6272',
  },
  tabStyle: {
    height: 32,
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
export default Screen1;
