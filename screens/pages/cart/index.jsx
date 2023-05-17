import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';

import Header3 from '../../components/headers/header3';

import {Icon} from 'react-native-elements';
import {ScrollView, Swipeable} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart, addCartQty, minusCartQty} from '../../redux/slice/cart';

import {URL_IMAGE} from '@env';
function Cart(props) {
  const url = URL_IMAGE;
  const dispatch = useDispatch();
  const dataCart = useSelector(state => state.cart.cart);
  const renderRightActions = id => {
    return (
      <View className="flex-row h-full items-center">
        <TouchableOpacity
          className="px-3 py-2 bg-red-500"
          onPress={() => dispatch(removeFromCart(id))}>
          <Icon name="delete" color="#6A4029" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="px-3 py-2 bg-pink-500">
          <Icon name="favorite" color="red" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="w-screen h-full bg-[#EBEBEB]">
      <Header3 name="Cart" {...props} />
      <View className="mx-auto flex-row mb-4">
        <Image
          className="h-5 w-5"
          source={require('../../../assets/images/iwwa_swipe.png')}
        />
        <Text className="ml-2 font-poppins-reguler text-black">
          swipe on an item to delete
        </Text>
      </View>
      <ScrollView>
        {dataCart.map(item => {
          return (
            <View key={item.id} className="px-10 flex-col mb-3">
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <View className="w-full p-5 flex-row bg-white rounded-[30px] relative">
                  <Image
                    className="w-16 h-16 rounded-full"
                    source={{uri: url + item.image}}
                  />
                  <View className="ml-4">
                    <Text className="font-poppins-semibold text-black">
                      {item.menu_name}
                    </Text>
                    <Text className="font-poppins-reguler text-[#895537] my-2">
                      {item.price.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </Text>
                  </View>
                  <View className="absolute right-10 bottom-5">
                    <View className="flex-row w-16 justify-around bg-brown rounded-3xl">
                      <TouchableOpacity
                        onPress={() => dispatch(minusCartQty(item.id))}
                        disabled={item.qty == 1 ? true : false}>
                        <Text className="font-poppins-semibold text-white">
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text className="font-poppins-semibold text-white">
                        {item.qty}
                      </Text>
                      <TouchableOpacity
                        onPress={() => dispatch(addCartQty(item.id))}>
                        <Text className="font-poppins-semibold text-white">
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Swipeable>
            </View>
          );
        })}
      </ScrollView>
      <View className="px-10 mt-auto mb-8">
        <TouchableOpacity
          className="h-16 bg-brown rounded-xl"
          onPress={() => props.navigation.push('Checkout')}>
          <Text className="text-white m-auto font-poppins-semibold">
            Confirm and Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Cart;
