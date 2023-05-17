import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Header2 from '../../components/headers/header';
import {useDispatch, useSelector} from 'react-redux';
import {addMenusToCart} from '../../redux/slice/cart';

import {URL_IMAGE} from '@env';
function Detail(props) {
  const url = URL_IMAGE;
  const dispatch = useDispatch();
  const data = useSelector(state => state.menu.data);
  const dataCart = useSelector(state => state.cart.cart);

  const foundItem = dataCart.some(c => c.id === data.id);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  useEffect(() => {
    const itemInCart = dataCart.find(c => c.id === data.id);
    if (itemInCart) {
      setSize(itemInCart.size);
    } else {
      setSize('');
    }
  }, [dataCart, data.id]);

  return (
    <ScrollView className="w-screen h-full bg-[#EBEBEB]">
      <Header2 {...props} />
      <View>
        <Image
          source={{uri: url + data.image}}
          className="mx-auto rounded-full w-56 h-56"
        />
        <Text className="my-3 font-poppins-bold text-black text-3xl mx-auto">
          {data.menu_name}
        </Text>
        <Text className=" font-poppins-reguler text-lg mx-auto text-[#6A4029]">
          {data.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </Text>
      </View>
      <View className="p-10">
        <Text className="font-poppins-bold text-black">Delivery info</Text>
        <Text className="text-justify text-[#737373]">
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text className="mt-5 font-poppins-bold text-black">Description</Text>
        <Text className="text-justify text-[#737373]">{data.description}</Text>
      </View>
      <Text className="text-center my-2 text-xl font-poppins-reguler text-black">
        Choose Size
      </Text>
      <View className="px-10 w-screen flex-row justify-center gap-x-3 my-4">
        <TouchableOpacity
          className={`w-14 h-14 rounded-full ${
            size == 'R' ? 'border-2 border-black bg-white' : 'bg-brown'
          }`}
          onPress={() => setSize('R')}>
          <Text
            className={`m-auto font-poppins-semibold  text-lg ${
              size == 'R' ? 'text-black' : 'text-white'
            }`}>
            R
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-14 h-14 rounded-full ${
            size == 'L' ? 'border-2 border-black bg-white' : 'bg-brown'
          }`}
          onPress={() => setSize('L')}>
          <Text
            className={`m-auto font-poppins-semibold  text-lg ${
              size == 'L' ? 'text-black' : 'text-white'
            }`}>
            L
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-14 h-14 rounded-full ${
            size == 'XL' ? 'border-2 border-black bg-white' : 'bg-brown'
          }`}
          onPress={() => setSize('XL')}>
          <Text
            className={`m-auto font-poppins-semibold  text-lg ${
              size == 'XL' ? 'text-black' : 'text-white'
            }`}>
            XL
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-10">
        <TouchableOpacity
          className="h-16 bg-brown rounded-xl"
          onPress={() =>
            dispatch(addMenusToCart({...data, qty: qty, size: size}))
          }
          disabled={foundItem ? true : false}>
          <Text className="text-white m-auto font-poppins-semibold">
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
      <View className="my-4"></View>
    </ScrollView>
  );
}

export default Detail;
