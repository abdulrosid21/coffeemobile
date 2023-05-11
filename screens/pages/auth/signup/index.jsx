import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import axiosApiIntances from '../../../utils/axios';
function Signup(props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const handleInput = (name, value) => {
    setForm({...form, [name]: value});
  };
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'green', height: 100}}
        contentContainerStyle={{paddingHorizontal: 25}}
        text1Style={{
          fontSize: 20,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 12,
          fontWeight: '600',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };
  const handleAddData = async () => {
    try {
      const result = await axiosApiIntances.post('/users/addata', form);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: result.data.msg,
        position: 'top',
      });
      setTimeout(() => {
        props.navigation.navigate('Signin');
      }, 4000);
    } catch (error) {
      console.log(error.response.data.msg);
      Toast.show({
        type: 'error',
        text1: 'Message',
        text2: error.response.data.msg,
      });
    }
  };

  return (
    <View className="w-screen h-screen bg-white">
      <View className="flex justify-center h-full my-auto px-[8%]">
        <View className="w-full relative">
          <Image source={require('../../../../assets/images/signup.png')} />
          <View className="absolute right-0 top-0">
            <Text className="font-poppins-semibold text-7xl p-3 text-black">
              Sign
            </Text>
            <Text className="font-poppins-semibold text-7xl p-3 -mt-7 text-black">
              Up
            </Text>
          </View>
          <View className="gap-y-4">
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter your email adress"
              value={form.email}
              keyboardType="email-address"
              onChangeText={value => handleInput('email', value)}
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter your password"
              secureTextEntry={true}
              value={form.password}
              onChangeText={value => handleInput('password', value)}
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter your phone number"
              keyboardType="numeric"
              value={form.phone}
              onChangeText={value => handleInput('phone', value)}
            />
          </View>
          <View className="mt-7">
            <TouchableOpacity
              className="h-16 bg-brown rounded-xl mt-3"
              onPress={handleAddData}>
              <Text className="text-white m-auto font-poppins-semibold">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Toast config={toastConfig} />
    </View>
  );
}

export default Signup;
