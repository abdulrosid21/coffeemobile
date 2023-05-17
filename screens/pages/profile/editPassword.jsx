import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import axiosApiIntances from '../../utils/axios';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Header3 from '../../components/headers/header3';
function EditPassword(props) {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleInput = (name, value) => {
    setForm({...form, [name]: value});
  };
  const handleUpdate = async () => {
    try {
      const result = await axiosApiIntances.patch('users/edit-password', form);

      Toast.show({
        type: 'success',
        text1: result.data.msg,
        position: 'top',
      });
      setTimeout(() => {
        props.navigation.navigate('Profile');
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
      <Header3 name="Edit Password" {...props} />
      <View className="flex justify-center h-full my-auto px-[8%]">
        <View className="w-full">
          <Image
            className="mx-auto"
            source={require('../../../assets/images/login.png')}
          />
          <View className="gap-y-4">
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter old password"
              secureTextEntry={true}
              value={form.oldPassword}
              onChangeText={value => handleInput('oldPassword', value)}
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter new password"
              secureTextEntry={true}
              value={form.newPassword}
              onChangeText={value => handleInput('newPassword', value)}
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Repeat your new password"
              secureTextEntry={true}
              value={form.confirmPassword}
              onChangeText={value => handleInput('confirmPassword', value)}
            />
          </View>
          <View className="mt-5">
            <TouchableOpacity
              className="h-16 bg-brown rounded-xl"
              onPress={handleUpdate}>
              <Text className="text-white m-auto font-poppins-semibold">
                Save and Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
}

export default EditPassword;
