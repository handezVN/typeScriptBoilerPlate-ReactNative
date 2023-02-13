import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UsersScreen from '../screens/UsersScreen';
import {useTranslation} from 'react-i18next';
import CoinDetail from 'screens/UsersScreen/CoinDetail/CoinDetail';
import {CoinType} from 'screens/UsersScreen/CoinItem/CoinItem';

type UserStackProps = {
  Users: undefined;
  UserDetails: undefined;
  CoinDetail: {coin: CoinType};
};
const Stack = createNativeStackNavigator<UserStackProps>();

const UserStackNavigation = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      id="UserNavigation"
      initialRouteName="Users"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CoinDetail"
        component={CoinDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UserStackNavigation;
