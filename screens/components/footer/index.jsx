import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = props => {
  return (
    <View className="absolute bottom-0 left-0 right-0 h-16 flex flex-row justify-between items-center px-10">
      <TouchableOpacity>
        <Icon name="home" size={24} color="#6A4029" />
      </TouchableOpacity>
      <View className="flex flex-row">
        <TouchableOpacity
          className="mr-10"
          onPress={() => props.navigation.navigate('Profile')}>
          <Image
            source={require('../../../assets/images/user.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/chatbox.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
