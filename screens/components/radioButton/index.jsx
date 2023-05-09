import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const RadioButton = ({options, selectedOption, onSelect}) => {
  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center my-5
        "
        onPress={onSelect}>
        <View className="w-5 h-5 rounded-full border-[1px] border-gray-300 justify-center items-center bg-white">
          {selectedOption === options && (
            <View className="w-2 h-2 rounded-full bg-black" />
          )}
        </View>
        <Text className="ml-2 font-poppins-reguler text-black">{options}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
