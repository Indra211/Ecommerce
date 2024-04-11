import {useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {addUserData} from '../redux/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import {DefaultColors, FontSize, Fonts} from '../styles';
import {SafeArea} from '../components/SafeArea';
import {HButton} from '../components/button';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scale';
import {HomeCard} from '../components/HomeCard';

export const Home = () => {
  const products_data = useSelector(state => state.products.product_data);
  const homeProductList =
    products_data?.length > 5 ? products_data?.slice(1, 5) : products_data;
  return (
    <SafeArea style={{gap: 8}}>
      <View style={{gap: verticalScale(4)}}>
        <Text style={styles.homehead}>
          The Fastest Delivery{' '}
          <Text
            style={{
              color: 'orange',
            }}>
            In Your hands
          </Text>
        </Text>
        <Text
          style={{
            color: DefaultColors.black,
            fontFamily: Fonts.regular,
            fontSize: FontSize.h2,
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          laboriosam illo quam natus nostrum earum sunt est atque voluptatem
          quaerat molestias vel unde soluta, facilis nam, distinctio dicta,
          necessitatibus impedit.
        </Text>
        <HButton
          label={'Order'}
          btnStyles={{
            alignSelf: 'flex-start',
            paddingHorizontal: horizontalScale(36),
            marginTop: verticalScale(6),
          }}
          lblStyles={{fontFamily: Fonts.Bold, fontSize: FontSize.h3}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: moderateScale(8),
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        {homeProductList?.map((item, ind) => (
          <HomeCard
            key={ind}
            id={item?._id}
            name={item?.prod_name}
            price={item?.prod_price}
            belongs={item?.prod_cat}
            pic={item?.prod_pic}
          />
        ))}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  homehead: {
    fontFamily: Fonts.BoldItalic,
    fontSize: FontSize.title,
    color: DefaultColors.error,
  },
});
