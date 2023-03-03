import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import FeedbackScreen from '../screens/FeedbackScreen';
// import MoreScreen from '../screens/MoreScreen';
import Icon from 'react-native-vector-icons/Ionicons';
// import UsersStackScreen from './UserStackNavigation';
// import SettingsStackScreen from './SettingsStackNavigation';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import UserStackNavigation from './UserStackNavigation';
import SettingsStackNavigation from './SettingsStackNavigation';
import {DarkMode, LightMode} from 'constants/colors';
import {NativeMethods, TouchableOpacity, View, Text} from 'react-native';
import BottomIcon1 from '../assets/Svgs/BottomTabIcon1';
import BottomIcon2 from '../assets/Svgs/BottomTabIcon2';
import BottomIcon3 from '../assets/Svgs/BottomTabIcon3';
import BottomIcon4 from '../assets/Svgs/BottomTabIcon4';
import Screen1 from 'screens/Screen1/Screen1';
import Screen2 from 'screens/Screen1/Screen2';
import Screen3 from 'screens/Screen1/Screen3';
import Screen4 from 'screens/Screen1/Screen4';
const Tab = createBottomTabNavigator();

const HomeBottomNavigation = () => {
  const {dark} = useTheme();
  const Colors = dark ? DarkMode.colors : LightMode.colors;
  const {t} = useTranslation();
  const MyTab = (props: any) => {
    const route = props.route;
    const GetIcon = ({
      focused,
      color,
      size,
    }: {
      focused?: boolean;
      color?: string;
      size?: number;
    }) => {
      let iconName;
      if (route.name === 'UsersStack') {
        iconName = focused ? 'people' : 'people-outline';
      } else if (route.name === 'SettingsStack') {
        iconName = focused ? 'settings' : 'settings-outline';
      } else if (route.name === 'Feedback') {
        iconName = focused ? 'newspaper' : 'newspaper-outline';
      } else if (route.name === 'More') {
        iconName = focused ? 'apps' : 'apps-outline';
      }
      return <Icon name={iconName} size={size} color={color} />;
    };
    return (
      <View>
        <Text>Hello World {route}</Text>
      </View>
    );
  };
  function MyTabBar({state, descriptors, navigation}: any) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#181A20',
          height: 96,

          justifyContent: 'space-between',
          paddingTop: 24,
          paddingHorizontal: 50,
        }}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const getIcon = (tab: any) => {
            switch (tab) {
              case 'Steps':
                return (
                  <>
                    <BottomIcon1></BottomIcon1>
                  </>
                );
              case 'Notes':
                return (
                  <>
                    <BottomIcon2></BottomIcon2>
                  </>
                );
              case 'Notify':
                return (
                  <>
                    <BottomIcon3></BottomIcon3>
                  </>
                );
              case 'Trending':
                return (
                  <>
                    <BottomIcon4></BottomIcon4>
                  </>
                );
            }
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flexDirection: 'row'}}
              key={index}>
              {getIcon(label)}
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 5,
                }}>
                {isFocused ? label : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    <Tab.Navigator
      id="BottomNavigation"
      initialRouteName="Users"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
      })}
      tabBar={(props: any) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Steps"
        component={Screen1}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notes"
        component={Screen2}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notify"
        component={Screen3}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Trending"
        component={SettingsStackNavigation}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomNavigation;
