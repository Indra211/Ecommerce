import {Button, ScrollView, Text, View} from 'react-native';
import {SafeArea} from '../components/SafeArea';
import {DefaultColors, FontSize, Fonts} from '../styles';
import {moderateScale} from '../utility/scale';
import {useSelector} from 'react-redux';
import {CartCard} from '../components/cartCard';
import LottieView from 'lottie-react-native';
import {ProdCard} from '../components/ProdCard';

export const Cart = () => {
  const cart_data = useSelector(state => state.products.cartItems);
  const products_data = useSelector(state => state.products.product_data);
  const totalPrice = cart_data?.reduce(
    (acc, cur) => acc + parseInt(cur?.total),
    0,
  );
  const totalItems = cart_data?.reduce((acc, cur) => acc + cur?.qty, 0);
  const RenderItems = ({item, index}) => {
    return (
      <ProdCard
        key={index}
        name={item?.prod_name}
        pic={item?.prod_pic}
        price={item?.prod_price}
        belongs={item?.prod_cat}
        id={item?._id}
      />
    );
  };
  return (
    <SafeArea>
      {cart_data?.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../assests/emptycart.json')}
            autoPlay
            loop
            style={{height: moderateScale(400), width: moderateScale(400)}} // Example style added
          />
          <Text
            style={{
              color: DefaultColors.black,
              fontFamily: Fonts.BoldItalic,
              fontSize: FontSize.h2,
            }}>
            Your cart is empty !
          </Text>
          <ScrollView horizontal={true} contentContainerStyle={{gap: 8}}>
            {products_data?.map((item, index) => (
              <RenderItems item={item} index={index} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <ScrollView>
          <Text
            style={{
              color: DefaultColors.black,
              fontSize: FontSize.h2,
              fontFamily: Fonts.BoldItalic,
            }}>
            Your Cart
          </Text>
          <View style={{gap: 8}}>
            {cart_data?.map((item, index) => (
              <CartCard key={index} data={item} />
            ))}
          </View>
          <View style={{gap: 8, marginTop: 12}}>
            <Text
              style={{
                color: DefaultColors.white,
                padding: 8,
                backgroundColor: DefaultColors.primary,
              }}>
              Summary
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: DefaultColors.black,
                  fontFamily: Fonts.BoldItalic,
                }}>
                TotalItems:{' '}
              </Text>
              <Text
                style={{
                  color: DefaultColors.black,
                  fontSize: FontSize.h4,
                  fontWeight: '600',
                }}>
                {totalItems}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: DefaultColors.black,
                  fontFamily: Fonts.BoldItalic,
                }}>
                TotalCost:{' '}
              </Text>
              <Text
                style={{
                  color: DefaultColors.error,
                  fontSize: FontSize.h4,
                  fontWeight: '600',
                }}>
                {'₹'}{' '}
                <Text style={{color: DefaultColors.black}}>{totalPrice}</Text>
              </Text>
            </View>
            <Button title="Buy Now" color={DefaultColors.graph} />
          </View>
        </ScrollView>
      )}
    </SafeArea>
  );
};
