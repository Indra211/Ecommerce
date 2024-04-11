import {Text, View} from 'react-native';
import {HButton} from '../components/button';
import {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {moderateScale} from '../utility/scale';

export const Intro = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        navigation.navigate('btab');
      }, 2500);
    }, []),
  );
  return (
    <View style={{flex: 1, backgroundColor: '#000000aa'}}>
      <LottieView
        source={require('../assests/intro.json')}
        autoPlay
        loop
        style={{height: '100%', width: '100%'}}
      />
    </View>
  );
};
