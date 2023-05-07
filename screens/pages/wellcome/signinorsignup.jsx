import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

function SigninOrSignup({navigation}) {
  const handlePress = button => {
    switch (button) {
      case 'Login':
        navigation.navigate('Signin');
        break;
      case 'Create New Account':
        navigation.navigate('Signup');
        break;
      default:
        break;
    }
  };
  return (
    <View className="w-screen h-screen bg-neutral-100">
      <View className="flex justify-around h-full py-5 px-[10%]">
        <View className="p-5">
          <Text className="text-black text-center font-poppins-semibold text-5xl">
            Wellcome
          </Text>
          <Text className="text-center text-lg text-black font-poppins-reguler">
            Get a cup of coffee for free only for new user
          </Text>
        </View>
        <Image
          className="w-[100%]"
          source={require('../../../assets/images/girl.png')}
        />
        <View className="gap-y-3">
          <TouchableOpacity
            className="h-14 bg-brown rounded-lg"
            onPress={() => {
              handlePress('Create New Account');
            }}>
            <Text className="text-white m-auto font-poppins-semibold">
              Create New Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="h-14 bg-yellow rounded-lg"
            onPress={() => {
              handlePress('Login');
            }}>
            <Text className="text-white m-auto font-poppins-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SigninOrSignup;
