import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Header2 from '../../components/headers/header';
import {useDispatch, useSelector} from 'react-redux';
import {addMenusToCart} from '../../redux/slice/cart';

import * as ImagePicker from 'react-native-image-picker';
import {URL_IMAGE} from '@env';
import {useRoute} from '@react-navigation/native';
import axiosApiIntances from '../../utils/axios';
import {getDetailMenu} from '../../redux/slice/menu';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

function Detail(props) {
  const route = useRoute();
  const roles = useSelector(state => state.user.data.roles);
  const url = URL_IMAGE;
  const dispatch = useDispatch();
  const data = useSelector(state => state.menu.data);
  const dataCart = useSelector(state => state.cart.cart);
  const [form, setForm] = useState({
    category_id: data.category_id,
    menu_name: data.menu_name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    start_delive: data.start_delive,
    end_delive: data.end_delive,
  });

  const foundItem = dataCart.some(c => c.id === data.id);

  const [isEdit, setIsEdit] = useState('');
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

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
  const handleInput = (name, value) => {
    setForm({...form, [name]: value});
  };
  useEffect(() => setIsEdit(route.params.isEdit));
  useEffect(() => {
    const itemInCart = dataCart.find(c => c.id === data.id);
    if (itemInCart) {
      setSize(itemInCart.size);
    } else {
      setSize('');
    }
  }, [dataCart, data.id]);
  const handleUpdate = async id => {
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

        await dispatch(getDetailMenu(id));
      }
      const result = await axiosApiIntances.patch(`menus/edit/${id}`, form);
      await dispatch(getDetailMenu(id));

      Toast.show({
        type: 'success',
        text1: result.data.msg,
        position: 'top',
      });
      setTimeout(() => {
        props.navigation.navigate('Detail', false);
      }, 3000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.msg,
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
    <ScrollView className="w-screen h-full bg-[#EBEBEB]">
      <Header2 {...props} roles={roles} />
      <View className="px-10">
        <View className="relative">
          <Image
            source={
              imageSource !== null ? imageSource : {uri: url + data.image}
            }
            className="mx-auto rounded-full w-56 h-56"
          />
          {isEdit ? (
            <TouchableOpacity
              onPress={selectImage}
              className="absolute right-[17%] bottom-6 z-20 w-10 h-10 bg-brown rounded-full">
              <Image
                className="h-5 w-5 m-auto"
                resizeMode="contain"
                source={require('../../../assets/images/pensil.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {isEdit ? (
          <>
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter new menu name"
              value={form.menu_name}
              onChangeText={value => handleInput('menu_name', value)}
            />
            <TextInput
              className="w-full border-[#9F9F9F] border-b-[1px] pb-1"
              placeholder="Enter new price"
              value={String(form.price)}
              onChangeText={value => handleInput('price', value)}
            />
          </>
        ) : (
          <>
            <Text className="my-3 font-poppins-bold text-black text-3xl mx-auto">
              {data.menu_name}
            </Text>
            <Text className=" font-poppins-reguler text-lg mx-auto text-[#6A4029]">
              {data.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </Text>
          </>
        )}
      </View>
      <View className="p-10">
        <Text className="font-poppins-bold text-black">Delivery info</Text>
        <Text className="text-justify text-[#737373]">
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text className="mt-5 font-poppins-bold text-black">Description</Text>
        {isEdit ? (
          <TextInput
            className="border-black border-dashed border-2"
            value={form.description}
            onChangeText={value => handleInput('description', value)}
            placeholder="Enter text"
            multiline
            numberOfLines={5}
          />
        ) : (
          <Text className="text-justify text-[#737373]">
            {data.description}
          </Text>
        )}
      </View>
      {isEdit ? null : (
        <>
          <Text className="text-center my-2 text-xl font-poppins-reguler text-black">
            Choose Size
          </Text>
          <View className="px-10 w-screen flex-row justify-center gap-x-3 my-4">
            <TouchableOpacity
              className={`w-14 h-14 rounded-full ${
                size == 'R' ? 'border-2 border-black bg-white' : 'bg-brown'
              }`}
              onPress={() => setSize('R')}>
              <Text
                className={`m-auto font-poppins-semibold  text-lg ${
                  size == 'R' ? 'text-black' : 'text-white'
                }`}>
                R
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-14 h-14 rounded-full ${
                size == 'L' ? 'border-2 border-black bg-white' : 'bg-brown'
              }`}
              onPress={() => setSize('L')}>
              <Text
                className={`m-auto font-poppins-semibold  text-lg ${
                  size == 'L' ? 'text-black' : 'text-white'
                }`}>
                L
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-14 h-14 rounded-full ${
                size == 'XL' ? 'border-2 border-black bg-white' : 'bg-brown'
              }`}
              onPress={() => setSize('XL')}>
              <Text
                className={`m-auto font-poppins-semibold  text-lg ${
                  size == 'XL' ? 'text-black' : 'text-white'
                }`}>
                XL
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View className="px-10">
        {isEdit ? (
          <TouchableOpacity
            onPress={() => handleUpdate(data.id)}
            className="h-16 bg-brown rounded-xl">
            <Text className="text-white m-auto font-poppins-semibold">
              Save and Update
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="h-16 bg-brown rounded-xl"
            onPress={() =>
              dispatch(addMenusToCart({...data, qty: qty, size: size}))
            }
            disabled={foundItem ? true : false}>
            <Text className="text-white m-auto font-poppins-semibold">
              Add to cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="my-4"></View>

      <Toast config={toastConfig} />
    </ScrollView>
  );
}

export default Detail;
