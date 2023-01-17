import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1023361931327-i9c0luuc6d1omiu2i62fifuc3r3jd541.apps.googleusercontent.com',
});
const LoginScreen = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Hello" onPress={() => signIn()} />
      <GoogleSigninButton />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
