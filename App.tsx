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
import {
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
import {DarkMode, LightMode} from './src/constants/colors';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {getValueFromAsyncStorage} from './src/utils/asyncStorage';
import {
  setLanguage,
  setTheme,
  SettingType,
  themeItem,
} from './src/store/settingSlice';
import store, {globalStore} from './src/store/store';
import globalSlice, {globalType} from './src/store/globalSlice';
import Loader from './src/components/Loader';
import HomeScreen from './src/screens/HomeScreen';
import HomeBottomNavigation from './src/navigations/HomeBottomNavigation';
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
import i18n from './src/i18n/config';
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
  });

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
