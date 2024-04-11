import {Image, Text, View} from 'react-native';
import {moderateScale} from '../utility/scale';
import {DefaultColors} from '../styles';

export const HomeCard = ({name, pic, price, belongs, id}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: moderateScale(8),
        borderRadius: moderateScale(8),
        backgroundColor: DefaultColors.backgroundColor,
      }}>
      <View style={{width: moderateScale(200), height: moderateScale(200)}}>
        <Image
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          source={{
            uri: pic,
          }}
        />
      </View>
      <Text>{name}</Text>
      <Text>{belongs}</Text>
      <Text>₹ {price}</Text>
    </View>
  );
};
