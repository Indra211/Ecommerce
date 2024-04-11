import {Button, Image, Text, View, Linking} from 'react-native';
import {SafeArea} from '../components/SafeArea';
import {useSelector, useDispatch} from 'react-redux';
import {DefaultColors, FontSize, Fonts} from '../styles';
import {showToast} from '../utility/Toast';
import {clearStorage} from '../utility/storage';
import {addUserData} from '../redux/userSlice';
import {addProductsToCart} from '../redux/ProductSLice';

export const Account = ({navigation}) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.userData.userdata);
  const handleContact = async ({navigation}) => {
    const url = 'https://indra211.github.io/myportfolio';
    await Linking.openURL(url);
  };
  return (
    <SafeArea>
      {JSON.stringify(userdata) === '{}' ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}>
          <Text
            style={{
              color: DefaultColors.delete,
              fontFamily: Fonts.BoldItalic,
            }}>
            You didn't logged in Please Login !
          </Text>
          <Button
            title="login"
            color={DefaultColors.primary}
            onPress={() => {
              navigation.navigate('login');
            }}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 16,
          }}>
          <Image
            source={{
              uri: userdata?.profilePic,
            }}
            height={100}
            width={100}
            borderRadius={100}
            resizeMode="cover"
          />
          <Text
            style={{
              color: DefaultColors.black,
              fontSize: FontSize.h4,
            }}>
            Name:
            <Text
              style={{
                color: DefaultColors.black,
                fontFamily: Fonts.BoldItalic,
                fontSize: FontSize.h3,
              }}>
              {userdata?.firstName + userdata?.lastName}
            </Text>
          </Text>
          <Text
            style={{
              color: DefaultColors.black,
              fontSize: FontSize.h4,
            }}>
            Email:
            <Text
              style={{
                color: DefaultColors.black,
                fontFamily: Fonts.BoldItalic,
                fontSize: FontSize.h3,
              }}>
              {userdata?.email}
            </Text>
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                padding: 4,
                color: DefaultColors.warn,
                textDecorationLine: 'underline',
              }}
              onPress={handleContact}>
              Contact Us
            </Text>
            <Text
              style={{
                padding: 4,
                color: DefaultColors.error,
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                clearStorage();
                showToast('success', 'Logout successfully');
                dispatch(addUserData({}));
                dispatch(addProductsToCart([]));
                navigation.navigate('intro');
              }}>
              Logout
            </Text>
          </View>
        </View>
      )}
    </SafeArea>
  );
};
