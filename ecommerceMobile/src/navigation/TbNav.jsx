import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens/Home';
import {Cart} from '../screens/cart';
import {Account} from '../screens/Account';
import {Menu} from '../screens/Menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultColors} from '../styles';

const Tab = createBottomTabNavigator();
export const BTNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let selectedColor;
          if (route.name == 'home') {
            iconName = 'home';
            selectedColor = focused ? color : DefaultColors.graph;
          } else if (route.name == 'menu') {
            iconName = 'view-dashboard';
            selectedColor = focused ? color : DefaultColors.graph;
          } else if (route.name == 'account') {
            iconName = 'account';
            selectedColor = focused ? color : DefaultColors.graph;
          }
          return <Icon size={size} name={iconName} color={selectedColor} />;
        },
      })}>
      <Tab.Screen name="home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="menu" component={Menu} options={{headerShown: false}} />
      <Tab.Screen
        name="account"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
