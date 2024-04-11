import {Provider, useDispatch} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {PNav} from './src/navigation/pNav';
import {Header} from './src/components/header';
import {useEffect} from 'react';
import {URL} from './src/utility/Urls';
import {addProducts, addProductsToCart} from './src/redux/ProductSLice';
import Toast from 'react-native-toast-message';
import {RetriveAsyncData} from './src/utility/storage';
import {addUserData} from './src/redux/userSlice';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(URL.fetch_products);
      const jsondata = await response.json();
      dispatch(addProducts(jsondata?.data));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    RetriveAsyncData('user')
      .then(data => {
        if (data) {
          dispatch(addUserData(data));
        }
      })
      .catch(error => console.log(error));
    RetriveAsyncData('cart')
      .then(data => {
        if (data) {
          dispatch(addProductsToCart(data));
        }
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <NavigationContainer>
      <Header />
      <PNav />
      <Toast position="top" bottomOffset={20} />
    </NavigationContainer>
  );
};
