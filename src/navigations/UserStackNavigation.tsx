import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UsersScreen from '../screens/UsersScreen';
import {useTranslation} from 'react-i18next';
import UserDetailsScreen from '../screens/UserDetails';

const Stack = createNativeStackNavigator();

const UserStackNavigation = () => {
  const {t} = useTranslation();

  type UserStackProps = {
    Users: undefined;
    UserDetails: undefined;
  };

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
        name="UserDetails"
        component={UserDetailsScreen}
        options={{headerShown: true, title: `${t('user_details')}`}}
      />
    </Stack.Navigator>
  );
};

export default UserStackNavigation;
