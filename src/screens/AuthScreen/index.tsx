import {
  Image,
  ImageBackground,
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
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {RobotoText} from 'components/TextStyle/RobotoText';
import Button from 'components/Button/Button';
const AuthScreen = () => {
  const {colors} = useTheme();
  const InputComponent = ({
    title,
    placeholder,
    onChange,
    isPassword = false,
  }: {
    title: string;
    placeholder: string;
    onChange?: any;
    isPassword?: boolean;
  }) => {
    const [eye, setEye] = useState<boolean>(isPassword);
    return (
      <View style={{marginBottom: 24}}>
        <RobotoText style={{fontWeight: '400', fontSize: 14}}>
          {title}
        </RobotoText>
        <View style={{position: 'relative'}}>
          <TextInput
            style={{
              height: dimen_y(48 / 812),
              width: '100%',
              backgroundColor: Colors.grey,
              marginTop: 8,
              borderRadius: 8,
              paddingHorizontal: 16,
            }}
            placeholder={placeholder}
            onChange={onChange}
            secureTextEntry={eye}
          />
          {isPassword && (
            <TouchableOpacity
              style={{position: 'absolute', top: 22.5, right: 10}}
              onPress={() => setEye(!eye)}>
              {eye ? (
                <Icon name={'eye'} size={20} color="#9D9D9D" />
              ) : (
                <Icon name={'eye-off'} size={20} color="#9D9D9D" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const LoginForm = () => {
    const [isRemember, setRemember] = useState(false);
    return (
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
          onClick={() => console.log('login')}
          style={{marginTop: 32}}></Button>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <ImageBackground
        source={Platform.OS === 'ios' ? loginBackground : loginBackground2}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: 'flex-end',
        }}
        resizeMode="repeat">
        <View
          style={{
            backgroundColor: 'white',
            height:
              Platform.OS === 'ios' ? dimen_y(611 / 812) : dimen_y(611 / 812),
            width: SCREEN_WIDTH,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingTop: 45,
            paddingHorizontal: 16,
          }}>
          <LoginForm />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
