import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Header2 from '../../components/headers/header';
import {useSelector} from 'react-redux';

function Detail(props) {
  const url = 'https://res.cloudinary.com/dqgebz3rr/image/upload/v1679725330/';
  const data = useSelector(state => state.menu.data);
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
      <View className="px-10">
        <TouchableOpacity className="h-16 bg-brown rounded-xl">
          <Text className="text-white m-auto font-poppins-semibold">
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Detail;
