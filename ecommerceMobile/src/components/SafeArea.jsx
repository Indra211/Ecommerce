import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {horizontalScale, verticalScale} from '../utility/scale';
import {DefaultColors} from '../styles';

export const SafeArea = ({style, children}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{...styles.main, ...style}}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  main: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: DefaultColors.white,
  },
});
