import React, {useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import Header3 from '../../components/headers/header3';
import {useSelector} from 'react-redux';
import axiosApiIntances from '../../utils/axios';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

function Payments(props) {
  const data = useSelector(state => state.address.data);
  const cart = useSelector(state => state.cart.cart);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0));
  }, [cart.length]);

  const handleOrder = async () => {
    try {
      const result = await axiosApiIntances.post('order/add', {
        ...data,
        menu: cart,
        totalPayment: total + 0.1 * total,
        tax: 0.1 * total,
      });
      Toast.show({
        type: 'success',
        text1: result.data.msg,
        position: 'top',
      });
      setTimeout(() => {
        props.navigation.push('App Home');
      }, 4000);
    } catch (error) {
      console.log(error);
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
      <Header3 name="" {...props} />
      <View className="px-10 w-full">
        <Text className="font-poppins-bold text-3xl text-black">
          Payment Methods
        </Text>
        <View className="bg-[#9F9F9F] h-[2px] my-2" />
        <Image
          className="my-2"
          source={require('../../../assets/images/card.png')}
        />
        <View className="bg-[#9F9F9F] h-[2px] my-4" />

        <ScrollView className="w-full">
          {cart.map(item => {
            return (
              <View
                key={item.id}
                className="flex-row justify-between items-stretch mb-3">
                <View>
                  <Text className="font-poppins-semibold text-black">
                    {item.qty + ' X ' + item.menu_name}
                  </Text>
                  <Text className="text-black">
                    {item.size == 'R'
                      ? 'Reguler'
                      : item.size == 'L'
                      ? 'Large'
                      : item.size == 'XL'
                      ? 'Extra Large'
                      : null}
                  </Text>
                </View>
                <Text className="font-poppins-semibold text-black self-center">
                  {item.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View className="bg-[#9F9F9F] h-[2px] my-4" />
        <View className="flex-row justify-between">
          <Text className="font-poppins-reguler text-black">Subtotal</Text>
          <Text className="font-poppins-reguler text-black">
            {total.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-poppins-reguler text-black">Tax</Text>
          <Text className="font-poppins-reguler text-black">
            {(0.1 * total).toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>
        <View className="flex-row justify-between my-5">
          <Text className="font-poppins-semibold text-black text-xl">
            Total
          </Text>
          <Text className="font-poppins-semibold text-black text-xl">
            {(total + 0.1 * total).toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>
      </View>
      <View className="px-10 mt-auto mb-8">
        <TouchableOpacity
          className="h-16 bg-brown rounded-xl"
          onPress={handleOrder}>
          <Text className="text-white m-auto font-poppins-semibold">
            Pay now
          </Text>
        </TouchableOpacity>
      </View>

      <Toast config={toastConfig} />
    </ScrollView>
  );
}

export default Payments;
