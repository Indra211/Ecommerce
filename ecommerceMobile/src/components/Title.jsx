import {Text} from 'react-native';
import {DefaultColors, FontSize, Fonts} from '../styles/fonts';

export const Title = ({text, color, size}) => {
  return (
    <Text
      style={{
        fontSize: size ? size : FontSize.title,
        fontFamily: Fonts.Bold,
        color: color ?? DefaultColors.black,
        textAlign: 'center',
      }}>
      {text}
    </Text>
  );
};
