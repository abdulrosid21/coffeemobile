import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Header3 from '../../components/headers/header3';
import RadioButton from '../../components/radioButton';
import {useDispatch, useSelector} from 'react-redux';
import {addAdrress} from '../../redux/slice/address';

function Checkout(props) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.data);
  const cart = useSelector(state => state.cart.cart);
  const addresState = useSelector(state => state.address.data);
  console.log(addresState);
  const [name, setName] = useState(addresState.name || data.display_name);
  const [address, setaddress] = useState(
    addresState.delivery_address || data.address,
  );
  const [phoneNumber, setphoneNumber] = useState(
    addresState.phone || data.phone,
  );
  const [selectedOption, setSelectedOption] = useState('');
  const [showInputFields, setShowInputFields] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0));
  }, [cart.length]);
  useEffect(() => {
    const getDelivery = addresState.delivery_option.length !== 0 ? true : false;
    if (getDelivery) setSelectedOption(addresState.delivery_option);
  }, [setSelectedOption]);
  const handleSelectOption = option => {
    setSelectedOption(option);
  };
  const handleShowInputFields = () => {
    setShowInputFields(true);
    setShowSave(true);
  };

  const handleSave = () => {
    dispatch(
      addAdrress({
        name: name,
        delivery_address: address,
        phone: phoneNumber,
        delivery_option: selectedOption,
        eating_time: new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        }),
        code_promo: '',
      }),
    );
    setShowInputFields(false);
    setShowSave(false);
  };

  return (
    <View className="bg-[#EBEBEB] w-screen h-full">
      <Header3 name="Checkout" {...props} />
      <View className="px-10 h-full">
        <Text className="font-poppins-bold text-black text-4xl p-1">
          Delivery
        </Text>
        <View className="w-full flex-row justify-between p-1">
          <Text className="font-poppins-semibold text-black">
            Address detail
          </Text>
          {showSave ? (
            <TouchableOpacity onPress={handleSave}>
              <Text className="text-[#6A4029]">save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleShowInputFields}>
              <Text className="text-[#6A4029]">change</Text>
            </TouchableOpacity>
          )}
        </View>
        {showInputFields ? (
          <View className="p-5 w-full rounded-xl bg-white">
            <TextInput
              style={{
                padding: 10,
                fontSize: 12,
                fontFamily: 'Poppins-Reguler',
                color: 'black',
              }}
              placeholder="Enter name"
              value={name}
              onChangeText={value => setName(value)}
            />
            <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
            <TextInput
              style={{
                padding: 10,
                fontSize: 12,
                fontFamily: 'Poppins-Reguler',
                color: 'black',
              }}
              placeholder="Enter place to delivery"
              value={address}
              onChangeText={value => setaddress(value)}
            />
            <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
            <TextInput
              style={{
                padding: 10,
                fontSize: 12,
                fontFamily: 'Poppins-Reguler',
                color: 'black',
              }}
              placeholder="Enter phone number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={value => setphoneNumber(value)}
            />
          </View>
        ) : (
          <View className="p-5 w-full rounded-xl bg-white">
            <Text className="font-poppins-semibold text-black">
              {addresState.name || data.display_name}
            </Text>
            <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
            <Text className="font-poppins-reguler text-black">
              {addresState.delivery_address || data.address}
            </Text>
            <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
            <Text className="font-poppins-reguler text-black">
              {addresState.phone || data.phone}
            </Text>
          </View>
        )}
        <Text className="font-poppins-semibold text-black mt-4">
          Delivery Method
        </Text>
        <View className="p-5 w-full rounded-xl bg-white">
          <RadioButton
            options="Door Delivery"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Door Delivery')}
          />
          <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
          <RadioButton
            options="Pick Up"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Pick Up')}
          />
          <View className="bg-[#EBEBEB] w-full h-[1px] my-[1px]" />
          <RadioButton
            options="Dine In"
            selectedOption={selectedOption}
            onSelect={() => handleSelectOption('Dine In')}
          />
        </View>
        <View className="flex-row justify-between my-8">
          <Text className="font-poppins-reguler text-black text-lg">total</Text>
          <Text className="font-poppins-semibold text-black text-xl">
            {total.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>
      </View>
      <View className="px-10 mt-auto mb-8">
        <TouchableOpacity
          className="h-16 bg-brown rounded-xl"
          onPress={() => {
            dispatch(
              addAdrress({
                name: name,
                delivery_address: address,
                phone: phoneNumber,
                delivery_option: selectedOption,
                eating_time: new Date().toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: true,
                }),
                code_promo: '',
              }),
            );
            props.navigation.push('Payments');
          }}>
          <Text className="text-white m-auto font-poppins-semibold">
            Proceed to payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Checkout;
