import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header3 = ({name, navigation}) => {
  return (
    <View className="flex-row items-center justify-between p-10">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="left" color="#000" size={15} />
      </TouchableOpacity>
      <View>
        <Text className="font-poppins-bold text-black">{name}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Header3;
