/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {DarkMode, LightMode} from './constants/colors';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {getValueFromAsyncStorage} from './utils/asyncStorage';
import {
  setLanguage,
  setTheme,
  SettingType,
  themeItem,
} from './store/settingSlice';
import store, {globalStore} from './store/store';
import globalSlice, {globalType} from './store/globalSlice';
import Loader from './components/Loader';
import HomeScreen from './screens/HomeScreen';
import HomeBottomNavigation from './navigations/HomeBottomNavigation';
const LightModeTheme = {
  ...DefaultTheme,
  dark: false,
  ...LightMode,
};

const DarkModeTheme = {
  ...DarkTheme,
  dark: true,
  ...DarkMode,
};
import i18n from './i18n/config';
import SplashScreen from 'react-native-splash-screen';
import WelcomeScreen from 'screens/WelcomeScreen';
import AuthStackNavigation from 'navigations/AuthStackNavigation';
import {
  NotificationListener,
  requestUserPermission,
} from 'utils/pushnotification_helper';
import messaging from '@react-native-firebase/messaging';

const AppRoot = () => {
  const colorScheme = useColorScheme();
  const [welCome, setWelcome] = useState(true);
  const dispatch = useDispatch();
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }
  useEffect(() => {
    // get and set user selected theme in store
    async function setSelectedTheme() {
      const selectedTheme = await getValueFromAsyncStorage('selected_theme');
      dispatch(setTheme(selectedTheme));
    }
    const isWelcome: any = getValueFromAsyncStorage('welcome');
    if (!isWelcome) {
      setWelcome(false);
    }
    // get and set user selected language in store
    async function setSelectedLanguage() {
      const selectedLanguage = await getValueFromAsyncStorage(
        'selected_language',
      );
      dispatch(setLanguage(selectedLanguage));
    }
    setSelectedTheme();
    setSelectedLanguage();
    SplashScreen.hide();
  });
  useEffect(() => {
    // registerAppWithFCM();
    requestUserPermission();
    NotificationListener();
  }, []);
  const themes: any = useSelector(
    (state: globalStore) => state.settings.themes,
  );
  const selectedTheme = themes.find(
    (item: themeItem) => item.selected === true,
  );
  let themeToSet = selectedTheme.code;
  if (themeToSet === 'system_default') {
    themeToSet = colorScheme;
  }

  const {isLoading} = useSelector((state: globalStore) => state.global);

  return (
    <NavigationContainer
      theme={themeToSet === 'dark' ? DarkModeTheme : LightModeTheme}>
      <Loader visible={isLoading} />
      <Modal visible={welCome}>
        <WelcomeScreen onPress={() => setWelcome(false)}></WelcomeScreen>
      </Modal>
      <AuthStackNavigation></AuthStackNavigation>
    </NavigationContainer>
  );
};
const initI18n = i18n;
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
