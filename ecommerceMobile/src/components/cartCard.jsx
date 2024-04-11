import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {moderateScale} from '../utility/scale';
import {DefaultColors, Fonts} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  decreaseQty,
  increaseQty,
  updateProductsToCart,
} from '../redux/ProductSLice';
export const CartCard = ({data}) => {
  const {_id, prod_name, prod_cat, prod_pic, prod_price, qty, total} = data;
  const dispatch = useDispatch();
  let quantity = parseInt(qty);
  return (
    <View
      style={{
        position: 'relative',
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        padding: moderateScale(16),
        borderRadius: moderateScale(8),
        backgroundColor: DefaultColors.white,
      }}>
      <View style={{width: moderateScale(200), height: moderateScale(200)}}>
        <Image
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          source={{
            uri: prod_pic,
          }}
        />
      </View>
      <View>
        <Text style={{color: DefaultColors.black}}>{prod_name}</Text>
        <Text style={{color: DefaultColors.black}}>{prod_cat}</Text>
        <Text style={{color: DefaultColors.black}}>₹ {prod_price}</Text>
        <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.operand}
            onPress={() => {
              if (qty !== 1) {
                dispatch(decreaseQty({_id, qty: (quantity += 1)}));
              }
            }}>
            <Icon name="minus" size={moderateScale(24)} />
          </TouchableOpacity>
          <Text style={{color: DefaultColors.black}}>{qty}</Text>
          <TouchableOpacity
            style={styles.operand}
            onPress={() => {
              dispatch(increaseQty({_id, qty: (quantity += 1)}));
            }}>
            <Icon name="plus" size={moderateScale(24)} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: Fonts.BoldItalic,
            fontWeight: '400',
            color: DefaultColors.black,
          }}>
          Total: ₹
          <Text
            style={{
              fontFamily: Fonts.BoldItalic,
              fontWeight: '700',
              color: DefaultColors.black,
            }}>
            {total}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(updateProductsToCart({_id}));
        }}
        style={{
          position: 'absolute',
          top: moderateScale(24),
          right: moderateScale(24),
        }}>
        <Icon
          name="close"
          size={moderateScale(24)}
          color={DefaultColors.error}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  operand: {
    backgroundColor: DefaultColors.backgroundColor,
    padding: 4,
    borderRadius: 4,
  },
});
