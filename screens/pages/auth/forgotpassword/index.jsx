import React from 'react';
import {View, Text} from 'react-native';

function ForgotPassword() {
  return (
    <View className="w-screen h-screen bg-blue-200">
      <View className="flex justify-center m-auto">
        <Text className="text-neutral-800 text-center font-semibold font-['Rubik'] ">
          Try editing me! 🎉
        </Text>
        <Text className="text-neutral-800">
          {' '}
          Hello from another ForgotPassword
        </Text>
      </View>
    </View>
  );
}

export default ForgotPassword;
