import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getDataUserById} from '../../../redux/slice/user';
import axiosApiIntances from '../../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

function Signin(props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleInput = (name, value) => {
    setForm({...form, [name]: value});
  };
  const handleLogin = async () => {
    try {
      const result = await axiosApiIntances.post('/users/login', form);
      AsyncStorage.setItem('token', result.data.token);
      await dispatch(getDataUserById());
      Toast.show({
        type: 'success',
        text1: result.data.msg,
        position: 'top',
      });
      setTimeout(() => {
        props.navigation.navigate('App');
      }, 4000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Message',
        text2: error.response.data.msg,
      });
    }
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
  return (
    <View className="w-screen h-full bg-white">
      <View className="flex justify-center h-full my-auto px-[8%]">
        <View className="w-full relative">
          <Image
            className="ml-8"
            source={require('../../../../assets/images/login.png')}
          />
          <View className="absolute right-7 top-24">
            <Text className="font-poppins-semibold text-7xl p-3 text-black">
              Log
            </Text>
            <Text className="font-poppins-semibold text-7xl p-3 -mt-7 text-black">
              In
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
            <Text
              className="text-brown text-xs ml-1 font-poppins-semibold"
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot password?
            </Text>
          </View>
          <View className="mt-5">
            <TouchableOpacity
              className="h-16 bg-brown rounded-xl"
              onPress={handleLogin}>
              <Text className="text-white m-auto font-poppins-semibold">
                Login
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center justify-center mt-5 mb-5">
              <View className="flex-1 h-0.5 bg-[#9F9F9F]" />
              <Text className="mx-3 text-gray-500 font-bold text-sm">
                or login with
              </Text>
              <View className="flex-1 h-0.5 bg-[#9F9F9F]" />
            </View>
            <TouchableOpacity className="h-16 bg-white rounded-xl px-8 py-3  items-center border-[1px] border-[#9F9F9F]">
              <View className="flex-row my-auto">
                <Image
                  className="w-5 h-5 mr-2"
                  source={require('../../../../assets/images/google.png')}
                />
                <Text className="text-black m-auto font-poppins-semibold">
                  Sign in with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
}

export default Signin;
