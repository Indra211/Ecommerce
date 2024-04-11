import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scale';
import {DefaultColors, FontSize, Fonts} from '../styles';
import {GradientText} from './GradientText';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export const Header = () => {
  const navigation = useNavigation();
  const cart_data = useSelector(state => state.products.cartItems);
  return (
    <GradientText
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: Fonts.Bold,
          fontSize: FontSize.subtitle,
          color: DefaultColors.white,
        }}>
        Indra
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('cart');
        }}
        style={{padding: moderateScale(8), position: 'relative'}}>
        <Icon
          name="cart"
          size={FontSize.subtitle}
          color={DefaultColors.white}
        />
        <Text
          style={{
            position: 'absolute',
            backgroundColor: DefaultColors.warn,
            padding: moderateScale(2),
            borderRadius: 100,
            right: 0,
            top: 0,
          }}>
          {cart_data?.length}
        </Text>
      </TouchableOpacity>
    </GradientText>
  );
};

const styles = StyleSheet.create({
  header: {
    height: verticalScale(70),
    width: '100%',
    // backgroundColor: DefaultColors.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: horizontalScale(24),
  },
});
