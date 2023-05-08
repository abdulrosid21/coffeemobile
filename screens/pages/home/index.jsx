import React from 'react';
import {View, Text} from 'react-native';
function Home() {
  return (
    <View className="w-screen h-screen bg-white">
      <View className="flex justify-center m-auto">
        <Text className="text-neutral-800 text-center font-semibold font-['Rubik'] ">
          Try editing me! 🎉
        </Text>
        <Text className="text-neutral-800"> Hello from home </Text>
      </View>
    </View>
  );
}

export default Home;
