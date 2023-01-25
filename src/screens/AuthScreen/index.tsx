import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import loginBackground from '../../assets/images/login-background.png';
import loginBackground2 from '../../assets/images/login-android.png';
import {dimen_y, SCREEN_HEIGHT, SCREEN_WIDTH} from 'utils/dimes';
import {useTheme} from '@react-navigation/native';
import {Colors} from 'constants/colors';

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {RobotoText} from 'components/TextStyle/RobotoText';
import Button from 'components/Button/Button';

import InputComponent from 'components/InputComponent/InputComponent';
import SocialForm from 'components/SocialForm/SocialForm';
import CodeFieldText from 'components/CodeField/CodeField';

const AuthScreen = ({navigation}: any) => {
  const {colors} = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [isSms, setIsSms] = useState(false);
  const RegisterForm = ({onPress}: {onPress: any}) => {
    return (
      <View>
        <InputComponent title="Tài khoản" placeholder="Email/ SĐT" />
        <InputComponent
          title="Mật khẩu"
          placeholder="Password"
          isPassword={true}
        />
        <InputComponent
          title="Nhập lại mật khẩu"
          placeholder="Confirm Password"
          isPassword={true}
        />
        <Button
          title="Đăng ký"
          onClick={onPress}
          style={{
            marginTop:
              Platform.OS === 'ios' ? dimen_y(32 / 812) : dimen_y(16 / 812),
          }}></Button>
      </View>
    );
  };
  const LoginForm = ({onPress}: {onPress?: any}) => {
    const [isRemember, setRemember] = useState(false);
    return (
      <>
        <View>
          <InputComponent title="Tài khoản" placeholder="Email/ SĐT" />
          <InputComponent
            title="Mật khẩu"
            placeholder="Password"
            isPassword={true}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setRemember(!isRemember)}>
                {isRemember ? (
                  <Icon2
                    name={'checkbox-outline'}
                    size={20}
                    color={colors.primary}
                  />
                ) : (
                  <Icon2
                    name={'checkbox-blank-outline'}
                    size={20}
                    color="#5C5C5C"
                  />
                )}
              </TouchableOpacity>
              <RobotoText style={{marginLeft: 5}}>Nhớ mật khẩu</RobotoText>
            </View>
            <View>
              <RobotoText style={{color: colors.primary}}>
                Quên mật khẩu?
              </RobotoText>
            </View>
          </View>
          <Button
            title="Đăng nhập"
            onClick={() => navigation.navigate('HomeScreen')}
            style={{marginTop: 32}}></Button>
        </View>
      </>
    );
  };
  const SMSForm = ({onPress}: any) => {
    const [code, setCode] = useState('');
    return (
      <View>
        <RobotoText
          style={{
            marginTop: 16,
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: '600',
          }}>
          Nhập mã xác nhận
        </RobotoText>
        <RobotoText
          style={{
            fontSize: 12,
            color: '#292D32',
            alignSelf: 'center',
            marginTop: 4,
          }}>
          Nhập mã gồm 4 chữ số đến từ số điện thoại của bạn
        </RobotoText>
        <CodeFieldText value={code} setValue={setCode}></CodeFieldText>
        <Button
          title="Xác nhận"
          onClick={onPress}
          style={{marginTop: 32}}></Button>
        <RobotoText
          style={{
            alignSelf: 'center',
            fontSize: 14,
            color: '#9D9D9D',
            marginTop: 14,
          }}>
          Gửi lại mã sau <RobotoText> 60s</RobotoText>
        </RobotoText>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        position: 'relative',
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
      }}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <Image
        source={Platform.OS === 'ios' ? loginBackground : loginBackground2}
        style={{
          width: SCREEN_WIDTH,
          height: (SCREEN_WIDTH * 250) / 378,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          height:
            Platform.OS === 'ios' ? dimen_y(611 / 812) : dimen_y(560 / 812),
          width: SCREEN_WIDTH,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop:
            Platform.OS === 'ios' ? dimen_y(45 / 812) : dimen_y(36 / 812),
          paddingHorizontal: 16,
          alignSelf: 'flex-end',
        }}>
        {!isSms ? (
          <>
            {isLogin ? (
              <LoginForm />
            ) : (
              <RegisterForm onPress={() => setIsSms(true)} />
            )}
            <SocialForm />
            <View
              style={{
                position: 'absolute',
                bottom: 48,
                right: 0,
                width: SCREEN_WIDTH,
                alignItems: 'center',
                zIndex: 999,
                elevation: 2,
              }}>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <RobotoText>
                  {isLogin
                    ? 'Bạn chưa có tài khoản? Đăng ký '
                    : 'Bạn đã có tài khoản? Đăng nhập '}
                  <RobotoText style={{color: '#97C15C'}}>tại đây</RobotoText>{' '}
                </RobotoText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <SMSForm onPress={() => setIsSms(!isSms)} />
        )}
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
