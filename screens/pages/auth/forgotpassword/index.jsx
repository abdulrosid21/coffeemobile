import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

function ForgotPassword() {
  return (
    <View className="w-screen h-full bg-white">
      <View className="justify-center h-full my-auto px-[8%]">
        <Text className="text-center font-poppins-semibold text-black text-7xl p-2">
          Don’t Worry!
        </Text>
        <Text className="text-center font-poppins-reguler text-lg text-black">
          Enter your email adress to get reset password link
        </Text>
        <Image
          className="mx-auto"
          source={require('../../../../assets/images/forgot.png')}
        />
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your email adress"
        />
        <View className="mt-7">
          <TouchableOpacity className="h-16 bg-brown rounded-xl mt-3">
            <Text className="text-white m-auto font-poppins-semibold">
              Send Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ForgotPassword;
