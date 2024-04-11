import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Intro} from '../screens/intro';
import {Login} from '../screens/Login';
import {SignUp} from '../screens/SignUp';
import {BTNav} from './TbNav';
import {Cart} from '../screens/cart';

const Stack = createNativeStackNavigator();
export const PNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="intro" component={Intro} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="btab" component={BTNav} />
      <Stack.Screen name="cart" component={Cart} />
    </Stack.Navigator>
  );
};
