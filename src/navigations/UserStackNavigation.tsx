import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

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
      screenOptions={{headerShown: false}}></Stack.Navigator>
  );
};

export default UserStackNavigation;
