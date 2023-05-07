import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Wellcome from '../pages/wellcome';
import SigninOrSignup from '../pages/wellcome/signinorsignup';
import App from './app';
import Signin from '../pages/auth/signin';
import Signup from '../pages/auth/signup';
import ForgotPassword from '../pages/auth/forgotpassword';
const Stack = createStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome">
        <Stack.Screen
          name="Wellcome"
          component={Wellcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SigninOrSignup"
          component={SigninOrSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="App"
          component={App}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
