import React, {useState} from 'react';
import {TextInput, View, Image, Text, TouchableOpacity} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import Header3 from '../../components/headers/header3';

import RadioButton from '../../components/radioButton';
import {useDispatch, useSelector} from 'react-redux';
import axiosApiIntances from '../../utils/axios';
import {getDataUserById} from '../../redux/slice/user';

function EditProfile(props) {
  const dispatch = useDispatch();
  const url = 'https://res.cloudinary.com/dqgebz3rr/image/upload/v1679725330/';
  const dataUser = useSelector(state => state.user.data);
  const date = new Date(dataUser.dateofbirth);
  const [selectedOption, setSelectedOption] = useState(dataUser.gender);
  const handleSelectOption = option => {
    setSelectedOption(option);
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
  console.log(imageSource);
  const handle = async () => {
    try {
      const formData = new FormData();
      formData.append('images', {
        uri: imageSource.uri,
        type: imageSource.type,
        name: imageSource.fileName,
      });
      const result = await axiosApiIntances.patch(
        'users/image-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      await dispatch(getDataUserById());
      console.log(result.data.msg);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="w-screen h-full">
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
          value={dataUser.display_name}
        />
        <View className="w-full flex-row">
          <RadioButton
            options="Laki-laki"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Laki-laki')}
          />
          <View className="ml-3"></View>
          <RadioButton
            options="Perempuan"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Perempuan')}
          />
        </View>
        <Text className="font-poppins-semibold text-black mt-2">
          Email addres :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1 placeholder:text-brown"
          placeholder="Enter your email adress"
          value={dataUser.email}
          keyboardType="email-address"
          editable={false}
        />
        <Text className="font-poppins-semibold text-black mt-2">
          Phone Number :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your phone"
          value={dataUser.phone}
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
        />
        <Text className="font-poppins-semibold text-black mt-2">
          Delivery address :
        </Text>
        <TextInput
          className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
          placeholder="Enter your adress"
          value={dataUser.address}
        />
      </View>
      <View className="px-10 my-10">
        <TouchableOpacity onPress={handle} className="h-16 bg-brown rounded-xl">
          <Text className="text-white m-auto font-poppins-semibold">
            Save and Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EditProfile;
