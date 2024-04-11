import Toast from 'react-native-toast-message';
import {moderateScale} from './scale';

export const showToast = (type, text) => {
  Toast.show({
    type: type,
    text1: text,
    text1Style: {fontSize: moderateScale(16)},
  });
};
