import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import ThemesScreen from '../screens/ThemesScreen';
import LanguagesScreen from '../screens/LanguagesScreen';
import {useTranslation} from 'react-i18next';
import HomeBottomNavigation from './HomeBottomNavigation';
import AuthScreen from 'screens/AuthScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      id="AuthsNavigation"
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{headerShown: false, title: `${t('auth')}`}}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeBottomNavigation}
        options={{headerShown: true, title: `${t('home')}`}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
