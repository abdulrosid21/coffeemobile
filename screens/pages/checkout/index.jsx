import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header3 from '../../components/headers/header3';
import RadioButton from '../../components/radioButton';

function Checkout(props) {
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectOption = option => {
    setSelectedOption(option);
  };

  return (
    <View className="bg-[#EBEBEB] w-screen h-full">
      <Header3 name="Checkout" {...props} />
      <View className="px-10 h-full">
        <Text className="font-poppins-bold text-black text-4xl p-1">
          Delivery
        </Text>
        <View className="w-full flex-row justify-between p-1">
          <Text className="font-poppins-semibold text-black">
            Address detail
          </Text>
          <TouchableOpacity>
            <Text className="text-[#6A4029]">change</Text>
          </TouchableOpacity>
        </View>
        <View className="p-5 w-full rounded-xl bg-white">
          <Text className="font-poppins-semibold text-black">
            Iskandar Street
          </Text>
          <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
          <Text className="font-poppins-reguler text-black">
            Km 5 refinery road oppsite re public road, effurun, Jakarta
          </Text>
          <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
          <Text className="font-poppins-reguler text-black">
            +62 81348287878
          </Text>
        </View>
        <Text className="font-poppins-semibold text-black mt-4">
          Delivery Method
        </Text>
        <View className="p-5 w-full rounded-xl bg-white">
          <RadioButton
            options="Door delivery"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Door delivery')}
          />
          <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
          <RadioButton
            options="Pick up at store"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Pick up at store')}
          />
          <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
          <RadioButton
            options="Dine in"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Dine in')}
          />
        </View>
        <View className="flex-row justify-between my-8">
          <Text className="font-poppins-reguler text-black text-lg">total</Text>
          <Text className="font-poppins-semibold text-black text-xl">
            IDR 123.000
          </Text>
        </View>
      </View>
      <View className="px-10 mt-auto mb-8">
        <TouchableOpacity
          className="h-16 bg-brown rounded-xl"
          onPress={() => props.navigation.push('Payments')}>
          <Text className="text-white m-auto font-poppins-semibold">
            Proceed to payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Checkout;
