import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientText = ({children, style}) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{...styles.gradient, ...style}}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
