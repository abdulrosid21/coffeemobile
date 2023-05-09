import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Header3 from '../../components/headers/header3';

function Payments(props) {
  return (
    <View className="w-screen h-full bg-[#EBEBEB]">
      <Header3 name="" {...props} />
      <View className="px-10 w-full">
        <Text className="font-poppins-bold text-3xl text-black">
          Payment Methods
        </Text>
        <View className="bg-[#9F9F9F] h-[2px] my-2" />
        <Image
          className="my-2"
          source={require('../../../assets/images/card.png')}
        />
        <View className="bg-[#9F9F9F] h-[2px] my-4" />

        <View className=" w-full">
          <View className="flex-row justify-between items-stretch mb-3">
            <View>
              <Text className="font-poppins-semibold text-black">
                1 Hazelnut Latte
              </Text>
              <Text className="text-black">Reguler</Text>
            </View>
            <Text className="font-poppins-semibold text-black self-center">
              IDR 20.000
            </Text>
          </View>
          <View className="flex-row justify-between items-stretch mb-3">
            <View>
              <Text className="font-poppins-semibold text-black">
                1 Pinky Promise
              </Text>
              <Text className="text-black">Extra Large</Text>
            </View>
            <Text className="font-poppins-semibold text-black self-center">
              IDR 25.000
            </Text>
          </View>
          <View className="flex-row justify-between items-stretch mb-3">
            <View>
              <Text className="font-poppins-semibold text-black">
                2 Choco Oreo Large
              </Text>
              <Text className="text-black">Large</Text>
            </View>
            <Text className="font-poppins-semibold text-black self-center">
              IDR 30.000
            </Text>
          </View>
        </View>
        <View className="bg-[#9F9F9F] h-[2px] my-4" />
        <View className="flex-row justify-between">
          <Text className="font-poppins-reguler text-black">Subtotal</Text>
          <Text className="font-poppins-reguler text-black">IDR 105.000</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-poppins-reguler text-black">Tax</Text>
          <Text className="font-poppins-reguler text-black">IDR 12.000</Text>
        </View>
        <View className="flex-row justify-between my-5">
          <Text className="font-poppins-semibold text-black text-xl">
            Total
          </Text>
          <Text className="font-poppins-semibold text-black text-xl">
            IDR 117.000
          </Text>
        </View>
      </View>
      <View className="px-10 mt-auto mb-8">
        <TouchableOpacity
          className="h-16 bg-brown rounded-xl"
          onPress={() => props.navigation.push('Payments')}>
          <Text className="text-white m-auto font-poppins-semibold">
            Pay now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Payments;
