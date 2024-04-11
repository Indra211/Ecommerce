import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scale';
import {useState} from 'react';
import {DefaultColors, FontSize} from '../styles';

export const DropDown = ({setValue, value, data}) => {
  const [isOpen, setIsopen] = useState(false);
  const renderItems = ({item, index}) => {
    return (
      <Text
        onPress={() => {
          setValue(item);
          setIsopen(!isOpen);
        }}
        key={index}
        style={{
          fontSize: FontSize.h3,
          fontWeight: '600',
          color: DefaultColors.black,
          padding: 4,
        }}>
        {item}
      </Text>
    );
  };
  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity
        onPress={() => setIsopen(!isOpen)}
        style={{
          width: '100%',
          backgroundColor: DefaultColors.backgroundColor,
          paddingVertical: verticalScale(12),
          paddingHorizontal: horizontalScale(8),
          borderRadius: moderateScale(4),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: DefaultColors.black}}>{value}</Text>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          color={DefaultColors.primary}
          size={moderateScale(24)}
        />
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: verticalScale(56),
            width: '100%',
            borderWidth: 1,
            zIndex: 10,
          }}>
          <FlatList
            scrollEnabled={true}
            style={{
              height: 100,
              backgroundColor: DefaultColors.white,
              width: '100%',

              borderBottomLeftRadius: moderateScale(8),
              borderBottomRightRadius: moderateScale(8),
            }}
            data={data}
            renderItem={renderItems}
          />
        </View>
      )}
    </View>
  );
};
