import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import axiosApiIntances from '../../../utils/axios';
function ForgotPassword(props) {
  const [form, setForm] = useState({
    email: '',
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
  const handleSendEmail = async () => {
    try {
      const result = await axiosApiIntances.post(
        '/users/forgot-password',
        form,
      );
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
      Toast.show({
        type: 'error',
        text1: 'Message',
        text2: 'Please input falid email',
      });
    }
  };

  return (
    <>
      <View className="w-screen h-full bg-white">
        <View className="justify-center h-full my-auto px-[8%]">
          <Text className="text-center font-poppins-semibold text-black text-7xl p-2">
            Don’t Worry!
          </Text>
          <Text className="text-center font-poppins-reguler text-lg text-black">
            Enter your email adress to get reset password link
          </Text>
          <Image
            className="mx-auto"
            source={require('../../../../assets/images/forgot.png')}
          />
          <TextInput
            className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
            placeholder="Enter your email adress"
            value={form.email}
            keyboardType="email-address"
            onChangeText={value => handleInput('email', value)}
          />
          <View className="mt-7">
            <TouchableOpacity
              className="h-16 bg-brown rounded-xl mt-3"
              onPress={handleSendEmail}>
              <Text className="text-white m-auto font-poppins-semibold">
                Send Link
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </>
  );
}

export default ForgotPassword;
