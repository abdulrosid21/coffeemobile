import React from 'react';
import {View, Text, TextInput, ScrollView, Image} from 'react-native';
import Header from '../../components/headers';

import CategoryList from '../../components/listcategory';
import Footer from '../../components/footer';
import Icon from 'react-native-vector-icons/Feather';
function Home(props) {
  return (
    <View className="w-screen h-full bg-[#EFEEEE]">
      <Header {...props} />
      <Text className="px-10 font-poppins-reguler font-bold text-black text-5xl">
        A good coffee is a good day
      </Text>
      <View className="px-10 my-2">
        <View className="flex-row items-center bg-[#EFEEEE] rounded-full p-2">
          <Icon name="search" size={30} color="#000" />
          <TextInput
            placeholder="Search"
            className="ml-3 flex-1 placeholder:text-lg placeholder:mt-2"
          />
        </View>
      </View>
      <View className="flex flex-row w-full my-4 px-10 mt-5 h-12">
        <CategoryList />
      </View>
      <Text className="px-10 my-4 ml-auto font-poppins-reguler text-[#6A4029]">
        See More
      </Text>
      <View className="pl-10 w-full h-auto pt-11 ">
        <ScrollView
          className="flex-row gap-3"
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View className="w-[220px] h-[270px]">
            <View className="h-[220px] mt-auto  bg-white rounded-3xl">
              <Image
                className="mx-auto -mt-16"
                source={require('../../../assets/images/hazelnut.png')}
              />
              <Text className="mx-auto my-3 font-poppins-semibold text-xl text-black">
                Hazelnut Latte
              </Text>
              <Text className="mx-auto font-poppins-reguler text-xl text-[#6A4029]">
                IDR 25.000
              </Text>
            </View>
          </View>
          <View className="w-[220px] h-[270px]">
            <View className="h-[220px] mt-auto  bg-white rounded-3xl">
              <Image
                className="mx-auto -mt-16"
                source={require('../../../assets/images/jahe.png')}
              />
              <Text className="mx-auto my-3 font-poppins-semibold text-xl text-black">
                Jahe
              </Text>
              <Text className="mx-auto font-poppins-reguler text-xl text-[#6A4029]">
                IDR 25.000
              </Text>
            </View>
          </View>
          <View className="w-[220px] h-[270px]">
            <View className="h-[220px] mt-auto  bg-white rounded-3xl">
              <Image
                className="mx-auto -mt-16"
                source={require('../../../assets/images/latte.png')}
              />
              <Text className="mx-auto my-3 font-poppins-semibold text-xl text-black">
                Latte
              </Text>
              <Text className="mx-auto font-poppins-reguler text-xl text-[#6A4029]">
                IDR 25.000
              </Text>
            </View>
          </View>
          <View className="w-[220px] h-[270px]">
            <View className="h-[220px] mt-auto  bg-white rounded-3xl">
              <Image
                className="mx-auto -mt-16"
                source={require('../../../assets/images/hazelnut.png')}
              />
              <Text className="mx-auto my-3 font-poppins-semibold text-xl text-black">
                Hazelnut Latte
              </Text>
              <Text className="mx-auto font-poppins-reguler text-xl text-[#6A4029]">
                IDR 25.000
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}

export default Home;
