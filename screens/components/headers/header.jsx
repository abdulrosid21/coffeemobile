import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header2 = props => {
  const [trash, showTrash] = useState(false);
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-[#EBEBEB] p-10">
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name="left" color="#000" size={15} />
      </TouchableOpacity>
      {props.roles == 'admin' ? (
        trash ? (
          <TouchableOpacity
            onPress={() => showTrash(false)}
            className="px-3 py-2 h-10 w-10 rounded-full bg-[#6A4029] p-2">
            <Icon name="delete" color="#ffffff" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              showTrash(true);
            }}
            className=" w-7 h-7 bg-brown rounded-full">
            <Image
              className="h-3 w-3 m-auto"
              resizeMode="contain"
              source={require('../../../assets/images/pensil.png')}
            />
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity onPress={() => props.navigation.push('Cart')}>
          <Icon name="shoppingcart" color="#000" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header2;
