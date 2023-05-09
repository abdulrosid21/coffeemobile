import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Header2 from '../../components/headers/header';

function Detail(props) {
  return (
    <View className="w-screen h-full bg-[#EBEBEB]">
      <Header2 {...props} />
      <View>
        <Image
          source={require('../../../assets/images/icecoffee.png')}
          className="mx-auto rounded-full"
        />
        <Text className="my-3 font-poppins-bold text-black text-3xl mx-auto">
          Cold Brew
        </Text>
        <Text className=" font-poppins-reguler text-lg mx-auto text-[#6A4029]">
          IDR 30.000
        </Text>
      </View>
      <View className="p-10">
        <Text className="font-poppins-bold text-black">Delivery info</Text>
        <Text className="text-justify text-[#737373]">
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text className="mt-5 font-poppins-bold text-black">Description</Text>
        <Text className="text-justify text-[#737373]">
          Cold brewing is a method of brewing that combines ground coffee and
          cool water and uses time instead of heat to extract the flavor. It is
          brewed in small batches and steeped for as long as 48 hours.
        </Text>
      </View>
      <View className="px-10">
        <TouchableOpacity className="h-16 bg-brown rounded-xl">
          <Text className="text-white m-auto font-poppins-semibold">
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Detail;
