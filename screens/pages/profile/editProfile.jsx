import React, {useState} from 'react';
import {
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import Header3 from '../../components/headers/header3';

import RadioButton from '../../components/radioButton';
import {useDispatch, useSelector} from 'react-redux';
import axiosApiIntances from '../../utils/axios';
import {getDataUserById} from '../../redux/slice/user';
import {URL_IMAGE} from '@env';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

function EditProfile(props) {
  const dispatch = useDispatch();
  const url = URL_IMAGE;
  const dataUser = useSelector(state => state.user.data);
  const date = new Date(dataUser.dateofbirth);
  const [selectedOption, setSelectedOption] = useState(dataUser.gender);
  const handleSelectOption = option => {
    setSelectedOption(option);
  };
  const [form, setForm] = useState({
    display_name: dataUser.display_name,
    gender: selectedOption,
    phone: dataUser.phone,
    email: dataUser.email,
    address: dataUser.address,
  });
  const handleInput = (name, value) => {
    setForm({...form, [name]: value});
  };
  const [imageSource, setImageSource] = useState(null);
  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageSource(response.assets[0]);
      }
    });
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
  const handle = async () => {
    try {
      if (imageSource) {
        const formData = new FormData();
        formData.append('images', {
          uri: imageSource.uri,
          type: imageSource.type,
          name: imageSource.fileName,
        });
        await axiosApiIntances.patch('users/image-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        await dispatch(getDataUserById());
      }
      const result = await axiosApiIntances.patch('users/editdata', form);
      await dispatch(getDataUserById());

      Toast.show({
        type: 'success',
        text1: result.data.msg,
        position: 'top',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.msg,
      });
    }
  };
  return (
    <ScrollView className="w-screen">
      <Header3 name="Edit Profile" {...props} />
      <View className="px-10">
        <View className="relative">
          <TouchableOpacity
            onPress={selectImage}
            className="absolute right-[35%] bottom-6 z-20 w-5 h-5 bg-brown rounded-full">
            <Image
              className="h-3 w-3 m-auto"
              resizeMode="contain"
              source={require('../../../assets/images/pensil.png')}
            />
          </TouchableOpacity>

          <Image
            className="w-24 h-24 rounded-full mx-auto my-4"
            source={
              imageSource !== null ? imageSource : {uri: url + dataUser.image}
            }
          />
        </View>
        <Text className="font-poppins-semibold text-black mt-2">Name :</Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your display name"
          value={form.display_name}
          onChangeText={value => handleInput('display_name', value)}
        />
        <View className="w-full flex-row">
          <RadioButton
            options="Laki-laki"
            selectedOption={selectedOption}
            onSelect={() => {
              handleInput('gender', 'Laki-laki');
              handleSelectOption('Laki-laki');
            }}
          />
          <View className="ml-3"></View>
          <RadioButton
            options="Perempuan"
            selectedOption={selectedOption}
            onSelect={() => {
              handleInput('gender', 'Perempuan');
              handleSelectOption('Perempuan');
            }}
          />
        </View>
        <Text className="font-poppins-semibold text-black mt-2">
          Email addres :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1 placeholder:text-brown"
          placeholder="Enter your email adress"
          value={form.email}
          keyboardType="email-address"
          editable={false}
        />
        <Text className="font-poppins-semibold text-black mt-2">
          Phone Number :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your phone"
          value={form.phone}
          onChangeText={value => handleInput('phone', value)}
        />
        <Text className="font-poppins-semibold text-black mt-2">
          Date of Birth :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your date"
          value={date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta',
          })}
          editable={false}
        />
        <Text className="font-poppins-semibold text-black mt-2">
          Delivery address :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your adress"
          value={form.address}
          onChangeText={value => handleInput('address', value)}
        />
      </View>
      <View className="px-10 my-10">
        <TouchableOpacity onPress={handle} className="h-16 bg-brown rounded-xl">
          <Text className="text-white m-auto font-poppins-semibold">
            Save and Update
          </Text>
        </TouchableOpacity>
      </View>

      <Toast config={toastConfig} />
    </ScrollView>
  );
}

export default EditProfile;
