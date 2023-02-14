import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import ThemesScreen from '../screens/ThemesScreen';
import LanguagesScreen from '../screens/LanguagesScreen';
import {useTranslation} from 'react-i18next';
import WatchListScreen from 'screens/WatchList';

const Stack = createNativeStackNavigator();

const WatchListStackNavigation = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      id="WatchListNavigation"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="WatchList"
        component={WatchListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default WatchListStackNavigation;
