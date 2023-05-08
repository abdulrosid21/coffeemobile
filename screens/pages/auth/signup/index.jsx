import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

function Signup() {
  return (
    <View className="w-screen h-screen bg-white">
      <View className="flex justify-center h-full my-auto px-[8%]">
        <View className="w-full relative">
          <Image source={require('../../../../assets/images/signup.png')} />
          <View className="absolute right-0 top-0">
            <Text className="font-poppins-semibold text-7xl p-3 text-black">
              Sign
            </Text>
            <Text className="font-poppins-semibold text-7xl p-3 -mt-7 text-black">
              Up
            </Text>
          </View>
          <View className="gap-y-4">
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter your email adress"
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter your password"
              secureTextEntry={true}
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter your phone number"
              keyboardType="numeric"
            />
          </View>
          <View className="mt-7">
            <TouchableOpacity className="h-16 bg-brown rounded-xl mt-3">
              <Text className="text-white m-auto font-poppins-semibold">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Signup;
