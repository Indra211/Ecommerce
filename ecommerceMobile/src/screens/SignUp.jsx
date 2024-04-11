import {Image, Text, TouchableOpacity, View} from 'react-native';
import {StoreAsyncData} from '../utility/storage';
import {addUserData} from '../redux/userSlice';
import {showToast} from '../utility/Toast';
import {URL} from '../utility/Urls';
import {addTokens} from '../redux/AuthTokens';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import GalleryModel from '../components/galleryMoadl';
import {handleCamera, handleGallery} from '../utility/const';
import {DEFAULTS} from '../utility/defaults';
import {DefaultColors} from '../styles';
import {SafeArea} from '../components/SafeArea';
import {InputText} from '../components/InputText';
import {HButton} from '../components/button';

export const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [modal, setModal] = useState(false);
  const onImagePress = async () => {
    try {
      const data = await handleGallery();
      setProfilePic(data?.base64);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };

  const openCamera = async () => {
    try {
      const data = await handleCamera();
      setProfilePic(data?.base64);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };
  const handleSubmit = async () => {
    if (
      firstName &&
      lastName &&
      email &&
      password?.length >= 8 &&
      email?.includes('@')
    ) {
      if (password === cnfPassword) {
        try {
          setLoading(true);
          const response = await fetch(URL.signup, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
              profilePic,
            }),
          });
          const jsonData = await response.json();
          if (jsonData?.status === 'success') {
            showToast(jsonData.status, jsonData.message);
            dispatch(addTokens(jsonData?.data?.token));
            const userData = await fetch(URL.user(email), {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jsonData?.data?.token?.access_token}`,
              },
            });
            const userDataRes = await userData?.json();
            dispatch(addUserData(userDataRes?.data));
            StoreAsyncData('user', userDataRes?.data);
            navigation.navigate('btab');
          } else {
            showToast(jsonData.status, jsonData.message);
          }
        } catch {
          showToast('error', 'something went wrong !');
        } finally {
          setLoading(false);
        }
      } else {
        showToast('Passwords are not match');
        setCnfPassword('');
        setPassword('');
      }
    } else {
      showToast(
        'error',
        'Kindly check all fields and password should be more than 8 characters',
      );
    }
  };
  return (
    <SafeArea
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
      }}>
      <TouchableOpacity
        onPress={() => {
          setModal(!modal);
        }}
        style={{
          borderWidth: 1,
          borderColor: DefaultColors.backgroundColor,
          padding: 2,
        }}>
        <Image
          source={{uri: profilePic ? profilePic : DEFAULTS.default_img}}
          height={64}
          width={64}
          resizeMode="cover"
          borderRadius={8}
        />
      </TouchableOpacity>
      {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          OnGallery={onImagePress}
          OnCamera={openCamera}
        />
      )}

      <InputText
        required={true}
        label={'First Name'}
        value={firstName}
        setValue={setFirstName}
      />
      <InputText
        required={true}
        label={'Last Name'}
        value={lastName}
        setValue={setLastName}
      />
      <InputText
        required={true}
        label={'Email'}
        value={email}
        setValue={setEmail}
      />
      <InputText
        secure={true}
        required={true}
        label={'Password'}
        value={password}
        setValue={setPassword}
      />
      <InputText
        secure={true}
        required={true}
        label={'Confirm Password'}
        value={cnfPassword}
        setValue={setCnfPassword}
      />
      <HButton label={'Submit'} loading={loading} onPress={handleSubmit} />
    </SafeArea>
  );
};
