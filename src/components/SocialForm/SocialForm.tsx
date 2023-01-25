import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RobotoText} from 'components/TextStyle/RobotoText';
import facebookIcon from '../../assets/images/facebook.png';
import googleIcon from '../../assets/images/google.png';
import appleIcon from '../../assets/images/apple-logo.png';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '1023361931327-i9c0luuc6d1omiu2i62fifuc3r3jd541.apps.googleusercontent.com',
});
const SocialForm = () => {
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
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  }
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    console.log(appleAuthRequestResponse);
  }
  return (
    <View>
      <View
        style={{
          height: 21,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 32,
        }}>
        <View>
          <View
            style={{
              height: 10,
              width: 87,
              borderBottomColor: '#9D9D9D',
              borderBottomWidth: 1,
            }}></View>
          <View></View>
        </View>
        <View>
          <RobotoText style={{color: '#9D9D9D', fontWeight: '300'}}>
            Hoặc đăng nhập bằng
          </RobotoText>
        </View>
        <View>
          <View
            style={{
              height: 10,
              width: 87,
              borderBottomColor: '#9D9D9D',
              borderBottomWidth: 1,
            }}></View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 12,
        }}>
        <TouchableOpacity onPress={onFacebookButtonPress}>
          <Image
            source={facebookIcon}
            style={{height: 24, width: 24, marginHorizontal: 12}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={signIn}>
          <Image
            source={googleIcon}
            style={{height: 24, width: 24, marginHorizontal: 12}}></Image>
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={onAppleButtonPress}>
            <Image
              source={appleIcon}
              style={{height: 24, width: 24, marginHorizontal: 12}}></Image>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SocialForm;

const styles = StyleSheet.create({});
