import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

function Wellcome({navigation}) {
  const token = true;

  return (
    <View className="w-screen h-screen bg-neutral-100">
      <View className="flex justify-around h-full py-5 px-[10%]">
        <Text className="text-black text-center font-poppins-semibold p-5 text-5xl">
          Coffee for Everyone
        </Text>
        <Image
          className="object-cover w-full"
          source={require('../../../assets/images/people.png')}
        />
        {token ? (
          <TouchableOpacity
            className="h-14 bg-brown rounded-lg"
            onPress={() => navigation.navigate('App')}>
            <Text className="text-white m-auto font-poppins-semibold">
              Go to apps
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="h-14 bg-brown rounded-lg"
            onPress={() => navigation.navigate('SigninOrSignup')}>
            <Text className="text-white m-auto font-poppins-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Wellcome;
