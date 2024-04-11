import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeArea} from '../components/SafeArea';
import {horizontalScale, moderateScale, verticalScale} from '../utility/scale';

import {DefaultColors, FontSize} from '../styles';
import {DropDown} from '../components/Dropdown';
import {ProdCard} from '../components/ProdCard';

export const Menu = () => {
  const products_data = useSelector(state => state.products.product_data);
  const cat_list = products_data?.map(item => item?.prod_cat);
  const [filterCatType, setFilterCatType] = useState('All');
  const filterProds = filterCatType
    ? products_data?.filter(
        item => item?.prod_cat?.toLowerCase() === filterCatType?.toLowerCase(),
      )
    : [];
  const RenderItems = ({item, index}) => {
    return (
      <ProdCard
        key={index}
        name={item?.prod_name}
        pic={item?.prod_pic}
        price={item?.prod_price}
        belongs={item?.prod_cat}
        id={item?._id}
      />
    );
  };
  return (
    <SafeArea>
      <View>
        <Text style={{color: DefaultColors.black}}>Filter</Text>
        <DropDown
          value={filterCatType}
          setValue={setFilterCatType}
          data={[...new Set(['All', ...cat_list])]}
        />
      </View>
      <View style={{marginBottom: verticalScale(88)}}>
        <Text style={{color: DefaultColors.black}}>
          {filterCatType === 'All' ? 'All Products' : 'Filtered Products'}
        </Text>
        <FlatList
          contentContainerStyle={{gap: 8, alignItems: 'center'}}
          numColumns={2}
          data={filterCatType === 'All' ? products_data : filterProds}
          renderItem={RenderItems}
        />
      </View>
    </SafeArea>
  );
};
