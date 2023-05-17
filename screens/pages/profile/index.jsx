import React, {useEffect} from 'react';
import Header3 from '../../components/headers/header3';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDataOrder} from '../../redux/slice/orders';

import {URL_IMAGE} from '@env';
function Profile(props) {
  const dispatch = useDispatch();
  const url = URL_IMAGE;
  const user = useSelector(state => state.user.data);
  return (
    <View className="w-screen h-full">
      <Header3 name="" {...props} />
      <View className="px-10">
        <Text className="text-black font-poppins-bold text-3xl">
          My Profile
        </Text>
        <View className="flex-row justify-between mt-7 mb-3">
          <Text className="text-black font-poppins-semibold">
            Your Information
          </Text>
          <Text
            className="text-brown"
            onPress={() => props.navigation.navigate('Edit Profile')}>
            edit
          </Text>
        </View>
        <View className="w-full bg-white rounded-lg p-3 flex-row h-auto justify-between px-6 mb-5">
          <Image
            className="w-24 h-24 rounded-full"
            source={{uri: url + user.image}}
          />
          <View>
            <Text className=" font-poppins-semibold text-black text-xl">
              {user.display_name}
            </Text>
            <Text className=" font-poppins-reguler text-[#6A4029]">
              {user.email}
            </Text>
            <Text className=" font-poppins-reguler text-[#6A4029]">
              {user.phone}
            </Text>
            <Text className=" font-poppins-reguler text-[#6A4029]">
              {user.address}
            </Text>
          </View>
        </View>
        <View className="gap-y-5">
          <TouchableOpacity
            onPress={() => {
              dispatch(getDataOrder());
              props.navigation.navigate('Order');
            }}
            className="flex-row w-full h-14 bg-white justify-between px-5 items-center rounded-lg">
            <Text className="font-poppins-semibold text-black">
              Order History
            </Text>
            <Image
              className="rotate-180 h-5"
              resizeMode="contain"
              source={require('../../../assets/images/arig.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Edit Password')}
            className="flex-row w-full h-14 bg-white justify-between px-5 items-center rounded-lg">
            <Text className="font-poppins-semibold text-black">
              Edit Password
            </Text>
            <Image
              className="rotate-180 h-5"
              resizeMode="contain"
              source={require('../../../assets/images/arig.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row w-full h-14 bg-white justify-between px-5 items-center rounded-lg">
            <Text className="font-poppins-semibold text-black">FAQ</Text>
            <Image
              className="rotate-180 h-5"
              resizeMode="contain"
              source={require('../../../assets/images/arig.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row w-full h-14 bg-white justify-between px-5 items-center rounded-lg">
            <Text className="font-poppins-semibold text-black">Help</Text>
            <Image
              className="rotate-180 h-5"
              resizeMode="contain"
              source={require('../../../assets/images/arig.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Profile;
