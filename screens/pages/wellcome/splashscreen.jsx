import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';

function SplashScreen(props) {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    setTimeout(() => {
      if (token) {
        props.navigation.replace('App');
      } else {
        props.navigation.replace('Auth');
      }
    }, 3000);
  };
  return (
    <View className="w-screen h-screen">
      <ImageBackground
        source={require('../../../assets/images/wellcome.png')}
        className="w-screen h-screen object-cover object-center">
        <View className="flex justify-center h-full py-5 px-[10%]">
          <Text className="text-white text-center font-poppins-semibold p-5 text-5xl">
            Coffee for Everyone
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SplashScreen;
