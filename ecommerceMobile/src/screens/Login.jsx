import {Button, Text, View} from 'react-native';
import {InputText} from '../components/InputText';
import {StoreAsyncData} from '../utility/storage';
import {addUserData} from '../redux/userSlice';
import {URL} from '../utility/Urls';
import {addTokens} from '../redux/AuthTokens';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {showToast} from '../utility/Toast';
import {SafeArea} from '../components/SafeArea';
import {HButton} from '../components/button';
import {DefaultColors, FontSize} from '../styles';

export const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (email && password && email?.includes('@')) {
      setLoading(true);
      const response = await fetch(URL.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      try {
        if (response.ok) {
          const jsondata = await response.json();
          if (jsondata.status === 'success') {
            showToast(jsondata.status, jsondata.message);
            dispatch(addTokens(jsondata?.data?.token));
            const userData = await fetch(URL.user(email), {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jsondata?.data?.token?.access_token}`,
              },
            });
            const userDataRes = await userData?.json();
            dispatch(addUserData(userDataRes?.data));
            StoreAsyncData('user', userDataRes?.data);
            navigation.navigate('btab');
          } else {
            showToast(jsondata.status, jsondata.message);
          }
        }
      } catch (err) {
        console.log(err);
        showToast('error', 'something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      showToast('error', 'Enter Valid details');
    }
  };
  return (
    <SafeArea
      style={{
        gap: 16,
      }}>
      <View>
        <InputText
          label={'Email'}
          required={true}
          value={email}
          setValue={setEmail}
        />
        <InputText
          label={'Password'}
          required={true}
          secure={true}
          value={password}
          setValue={setPassword}
        />
      </View>
      <Text
        style={{
          color: DefaultColors.black,
          fontWeight: '400',
          fontSize: FontSize.h3,
        }}>
        Don't have Account{' '}
        <Text
          style={{
            color: DefaultColors.warn,
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
          onPress={() => {
            navigation.navigate('signup');
          }}>
          Click Here
        </Text>
      </Text>
      <HButton label={'Login'} onPress={handleSubmit} loading={loading} />
    </SafeArea>
  );
};
