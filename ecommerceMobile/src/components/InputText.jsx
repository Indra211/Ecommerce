import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DefaultColors, FontSize, Fonts} from '../styles';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scale';
import Icon from 'react-native-vector-icons/Octicons';

export const InputText = ({
  label,
  placeholder,
  value,
  setValue,
  secure,
  inputContainer,
  multiline,
  inputStyles,
  required,
  error,
  setError,
}) => {
  const [visible, Setvisible] = useState(secure || true);
  return (
    <View style={{width: '100%'}}>
      <Text
        style={{
          ...styles.labelText,
          color: error ? DefaultColors.error : DefaultColors.black,
        }}>
        {error ? error : label}
        {required ? <Text style={styles.required}>*</Text> : ''}
      </Text>
      <View
        style={{
          ...styles.inputStyles,
          ...inputStyles,
          borderColor: error ? DefaultColors.error : DefaultColors.borderColor,
        }}>
        <TextInput
          style={{
            ...styles.input,
            ...inputContainer,
          }}
          placeholderTextColor={DefaultColors.disable}
          placeholder={placeholder}
          multiline={multiline ? multiline : false}
          value={value}
          onChangeText={val => {
            setValue(val);
            if (error) {
              setError('');
            }
          }}
          secureTextEntry={secure ? visible : false}
        />
        {secure !== undefined &&
          (visible ? (
            <TouchableOpacity
              style={{...styles.eye}}
              onPress={() => Setvisible(!visible)}>
              <Icon
                style={{
                  marginRight: moderateScale(4),
                  color: DefaultColors.primary,
                }}
                name="eye"
                size={moderateScale(22)}
                color={DefaultColors.primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{...styles.eye}}
              onPress={() => Setvisible(!visible)}>
              <Icon
                style={{
                  marginRight: moderateScale(4),
                }}
                name="eye-closed"
                size={moderateScale(22)}
                color={DefaultColors.primary}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.h4,
    color: DefaultColors.black,
    marginBottom: moderateScale(2),
  },
  input: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    color: DefaultColors.black,
    fontFamily: Fonts.regular,
    fontSize: FontSize.h4,
  },
  inputStyles: {
    borderWidth: 1,
    borderRadius: moderateScale(4),
    borderColor: DefaultColors.borderColor,
    width: '100%',
  },
  eye: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(10),
  },
  required: {
    paddingLeft: moderateScale(4),
    color: DefaultColors.error,
    fontSize: FontSize.h3,
  },
});
