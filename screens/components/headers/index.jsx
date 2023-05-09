import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const Header = props => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-[#EFEEEE] p-10">
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Image
          source={require('../../../assets/images/hammenu.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
        <Image
          source={require('../../../assets/images/shopping-cart.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
