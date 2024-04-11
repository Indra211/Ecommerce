import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {DefaultColors, FontSize, Fonts} from '../styles';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HButton = ({
  icon,
  iconcolor,
  loading,
  onPress,
  label,
  btnStyles,
  lblStyles,
}) => {
  return (
    <Pressable style={{...styles.btn, ...btnStyles}} onPress={onPress}>
      <>
        {loading ? (
          <ActivityIndicator size="small" color={DefaultColors.white} />
        ) : (
          ''
        )}
        {icon && (
          <Icon
            style={{marginRight: moderateScale(10)}}
            name={icon}
            size={moderateScale(22)}
            color={iconcolor ? iconcolor : DefaultColors.white}
          />
        )}
        <Text style={{...styles.lbl, ...lblStyles}}>
          {label?.toUpperCase()}
        </Text>
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: DefaultColors.primary,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    gap: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lbl: {
    color: DefaultColors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.h3,
    alignSelf: 'center',
    fontWeight: '800',
  },
});
