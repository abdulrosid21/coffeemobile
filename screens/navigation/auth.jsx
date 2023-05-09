import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wellcome from '../pages/wellcome';
import SigninOrSignup from '../pages/wellcome/signinorsignup';

import Signin from '../pages/auth/signin';
import Signup from '../pages/auth/signup';

import ForgotPassword from '../pages/auth/forgotpassword';
const Stack = createNativeStackNavigator();

function Auth() {
  return (
    <Stack.Navigator initialRouteName="Wellcome">
      <Stack.Screen
        name="Wellcome"
        component={Wellcome}
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
      <Stack.Screen
        name="SigninOrSignup"
        component={SigninOrSignup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Auth;
