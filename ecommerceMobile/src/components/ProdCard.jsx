import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {DefaultColors} from '../styles';
import {moderateScale} from '../utility/scale';
import {useDispatch} from 'react-redux';
import {addProductsToCart} from '../redux/ProductSLice';

export const ProdCard = ({name, pic, price, belongs, id}) => {
  const dispatch = useDispatch();
  const handleAddCartProd = () => {
    dispatch(
      addProductsToCart({
        _id: id,
        prod_cat: belongs,
        prod_name: name,
        prod_price: price,
        prod_pic: pic,
      }),
    );
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: moderateScale(16),
        borderRadius: moderateScale(8),
        backgroundColor: DefaultColors.white,
      }}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: moderateScale(200), height: moderateScale(200)}}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            source={{
              uri: pic,
            }}
          />
        </View>
        <Text style={{color: DefaultColors.black}}>{name}</Text>
        <Text style={{color: DefaultColors.black}}>{belongs}</Text>
        <Text style={{color: DefaultColors.black}}>₹ {price}</Text>
      </TouchableOpacity>
      <Button title="Add to Cart" color={'red'} onPress={handleAddCartProd} />
    </View>
  );
};
