import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';

import Header3 from '../../components/headers/header3';

import {Icon} from 'react-native-elements';
import {Swipeable} from 'react-native-gesture-handler';
function Cart(props) {
  const renderRightActions = () => {
    return (
      <View className="flex-row h-full items-center">
        <View className="px-3 py-2 bg-red-500">
          <Icon name="delete" color="#6A4029" size={24} />
        </View>
        <View className="px-3 py-2 bg-pink-500">
          <Icon name="favorite" color="red" size={24} />
        </View>
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
      <View className="px-10 flex-col mb-3">
        <Swipeable renderRightActions={renderRightActions}>
          <View className="w-full p-5 flex-row bg-white rounded-[30px] relative">
            <Image
              className="w-16 h-16 rounded-full"
              source={require('../../../assets/images/icecoffee.png')}
            />
            <View className="ml-4">
              <Text className="font-poppins-semibold text-black">
                Veggie tomato mix
              </Text>
              <Text className="font-poppins-reguler text-[#895537] my-2">
                IDR 34.000
              </Text>
            </View>
            <View className="absolute right-10 bottom-5">
              <View className="flex-row w-16 justify-around bg-brown rounded-3xl">
                <Text className="font-poppins-semibold text-white">-</Text>
                <Text className="font-poppins-semibold text-white">1</Text>
                <Text className="font-poppins-semibold text-white">+</Text>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
      <View className="px-10 flex-col mb-3">
        <Swipeable renderRightActions={renderRightActions}>
          <View className="w-full p-5 flex-row bg-white rounded-[30px] relative">
            <Image
              className="w-16 h-16 rounded-full"
              source={require('../../../assets/images/icecoffee.png')}
            />
            <View className="ml-4">
              <Text className="font-poppins-semibold text-black">
                Veggie tomato mix
              </Text>
              <Text className="font-poppins-reguler text-[#895537] my-2">
                IDR 34.000
              </Text>
            </View>
            <View className="absolute right-10 bottom-5">
              <View className="flex-row w-16 justify-around bg-brown rounded-3xl">
                <Text className="font-poppins-semibold text-white">-</Text>
                <Text className="font-poppins-semibold text-white">1</Text>
                <Text className="font-poppins-semibold text-white">+</Text>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
      <View className="px-10 flex-col mb-3">
        <Swipeable renderRightActions={renderRightActions}>
          <View className="w-full p-5 flex-row bg-white rounded-[30px] relative">
            <Image
              className="w-16 h-16 rounded-full"
              source={require('../../../assets/images/icecoffee.png')}
            />
            <View className="ml-4">
              <Text className="font-poppins-semibold text-black">
                Veggie tomato mix
              </Text>
              <Text className="font-poppins-reguler text-[#895537] my-2">
                IDR 34.000
              </Text>
            </View>
            <View className="absolute right-10 bottom-5">
              <View className="flex-row w-16 justify-around bg-brown rounded-3xl">
                <Text className="font-poppins-semibold text-white">-</Text>
                <Text className="font-poppins-semibold text-white">1</Text>
                <Text className="font-poppins-semibold text-white">+</Text>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
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
