import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header2 = props => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-[#EBEBEB] p-10">
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name="left" color="#000" size={15} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
        <Icon name="shoppingcart" color="#000" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Header2;
