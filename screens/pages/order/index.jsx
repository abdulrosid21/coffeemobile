import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';

import {Icon} from 'react-native-elements';

import {Swipeable} from 'react-native-gesture-handler';
import Header3 from '../../components/headers/header3';
import {useDispatch, useSelector} from 'react-redux';
import {getDataOrder} from '../../redux/slice/orders';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {URL_IMAGE} from '@env';
import axiosApiIntances from '../../utils/axios';
function Order(props) {
  const data = useSelector(state => state.orders.data);
  const dispatch = useDispatch();

  const handleDelete = async id => {
    try {
      const result = await axiosApiIntances.delete(`order/delete/${id}`);
      await dispatch(getDataOrder());
      Toast.show({
        type: 'success',
        text1: result.data.msg,
        position: 'top',
      });
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
  const renderRightActions = id => {
    return (
      <View className="flex-row h-full items-center">
        <TouchableOpacity
          onPress={() => handleDelete(id)}
          className="px-3 py-2 h-10 w-10 rounded-full bg-[#6A4029] p-2">
          <Icon name="delete" color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <Header3 name="" {...props} />
      <View className="px-10">
        <Text className="font-poppins-bold text-black text-3xl">
          Order History
        </Text>
        <View className="mx-auto flex-row mt-6 mb-2">
          {data.length < 1 ? (
            <Text className="ml-2 font-poppins-reguler text-black">
              No orders found
            </Text>
          ) : (
            <>
              <Image
                className="h-5 w-5"
                source={require('../../../assets/images/iwwa_swipe.png')}
              />
              <Text className="ml-2 font-poppins-reguler text-black">
                swipe on an item to delete
              </Text>
            </>
          )}
        </View>
      </View>
      <ScrollView className=" w-full">
        <View className="px-10 h-full">
          <View className="my-3">
            {data.map(item => {
              return (
                <View key={item.id}>
                  <Swipeable
                    renderRightActions={() => renderRightActions(item.id)}>
                    <View className="w-full p-5 flex-row bg-white rounded-[10px] relative mb-3">
                      <Image
                        className="w-16 h-16 rounded-full"
                        source={{uri: URL_IMAGE + item.menus[0].image}}
                      />
                      <View className="ml-4">
                        <Text className="font-poppins-semibold text-black">
                          Ordered by : {item.display_name}
                        </Text>
                        <Text className="text-[#64748b]">
                          Status : {item.status_order}
                        </Text>
                        <Text className="text-[#64748b]">
                          {item.delivery_option}
                        </Text>
                        <Text className="text-[#64748b]">
                          address : {item.delivery_address}
                        </Text>
                        <Text className="text-[#64748b]">Menu Dipesan :</Text>
                        <View className="ml-3">
                          {item.menus.map(item => {
                            return (
                              <Text
                                className="text-[#64748b]"
                                key={item.menu_name}>
                                {item.qty + ' X ' + item.menu_name}
                              </Text>
                            );
                          })}
                        </View>
                        <Text className="font-poppins-reguler text-[#895537] my-2">
                          Total :{' '}
                          {item.menus
                            .reduce((acc, cur) => {
                              return acc + cur.qty * cur.price;
                            }, 0)
                            .toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            })}
                        </Text>
                      </View>
                    </View>
                  </Swipeable>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Toast config={toastConfig} />
    </>
  );
}

export default Order;
