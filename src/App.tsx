/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, type PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
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
import HomeBottomNavigation from './navigations/HomeBottomNavigation';
import SplashScreen from 'react-native-splash-screen';
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
const AppRoot = () => {
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();

  useEffect(() => {
    // get and set user selected theme in store
    async function setSelectedTheme() {
      const selectedTheme = await getValueFromAsyncStorage('selected_theme');
      dispatch(setTheme(selectedTheme));
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

  const themes: any = useSelector(
    (state: globalStore) => state.settings.themes,
  );
  const selectedTheme = themes.find(
    (item: themeItem) => item.selected === true,
  );
  console.log('colors', selectedTheme);
  let themeToSet = selectedTheme && selectedTheme.code;

  const {isLoading} = useSelector((state: globalStore) => state.global);

  return (
    <NavigationContainer
      theme={themeToSet === 'dark' ? DarkModeTheme : LightModeTheme}>
      <StatusBar
        barStyle={
          themeToSet === 'dark' ? 'light-content' : 'dark-content'
        }></StatusBar>
      <Loader visible={isLoading} />
      <HomeBottomNavigation></HomeBottomNavigation>
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
