import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {dimen_x, SCREEN_WIDTH} from 'utils/dimes';
import {RobotoText} from 'components/TextStyle/RobotoText';

type Props = {
  title: string;
  image: any;
};

const WelcomeItem = ({title, image}: Props) => {
  return (
    <View style={{width: SCREEN_WIDTH}}>
      <View style={{paddingHorizontal: dimen_x(44 / 375)}}>
        {image && (
          <Image
            source={image}
            style={{
              width: '100%',
              height: 300,
            }}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={{paddingHorizontal: dimen_x(32 / 375)}}>
        <RobotoText
          style={{
            fontSize: dimen_x(14 / 375),
            fontWeight: '500',
            fontFamily: 'Roboto',
            color: 'black',
            alignItems: 'center',
          }}>
          {title}
        </RobotoText>
      </View>
    </View>
  );
};

export default memo(WelcomeItem);

const styles = StyleSheet.create({});
