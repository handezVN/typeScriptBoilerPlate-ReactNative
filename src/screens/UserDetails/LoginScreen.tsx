import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
const LoginScreen = () => {
  const {authorize} = useAuth0();
  const {user} = useAuth0();
  const {clearSession} = useAuth0();

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };
  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Button onPress={onLogin} title="Log in" />
      <Text>LoginScreen</Text>
      <>
        {user && <Text>Logged in as {user.name}</Text>}
        {!user && <Text>Not logged in</Text>}
      </>
      <Button onPress={onLogin} title="Log in" />
      <Button onPress={onLogout} title="Log out" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
