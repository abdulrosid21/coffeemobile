import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/home';
import Icon from 'react-native-vector-icons/FontAwesome';
import Detail from '../pages/detail';
import Cart from '../pages/cart';
import Checkout from '../pages/checkout';
import Payments from '../pages/payments';
import DataList from '../pages/allmenu';
import Profile from '../pages/profile';
import EditProfile from '../pages/profile/editProfile';
import Order from '../pages/order';
import EditPassword from '../pages/profile/editPassword';
import ManageOrder from '../pages/order/manageOrder';
import Menu from '../pages/menu';

import {getDataOrder} from '../redux/slice/orders';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {URL_IMAGE} from '@env';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const url = URL_IMAGE;
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.replace('Auth', {
        screen: 'Signin',
      });
    } catch (error) {}
  };
  return (
    <View className="h-screen w-full">
      <DrawerContentScrollView {...props}>
        <View className="min-h-[100px] bg-blue-500 justify-center p-10 -mt-1 bg-brown rounded-tr-3xl rounded-br-2xl">
          <Image
            className="rounded-full mx-auto h-28 w-28"
            source={{
              uri: `${url}${user.image}`,
            }}
          />
          <Text className="text-lg text-white font-bold mx-auto">
            {user.display_name}
          </Text>
          {user.roles == 'admin' ? (
            <Text className="text-lg text-white font-bold mx-auto">
              {user.roles}
            </Text>
          ) : null}
          <Text className="text-xs text-white font-poppins-reguler mx-auto">
            {user.email}
          </Text>
        </View>
        <View className="w-full">
          <View className="w-full mx-auto">
            <DrawerItem
              label="Edit Profile"
              onPress={() => props.navigation.navigate('Edit Profile')}
              icon={() => (
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/gg_profile.png')}
                  style={{width: 24, height: 24}}
                />
              )}
              labelStyle={{
                marginLeft: -16,
                borderBottomWidth: 1,
                paddingBottom: 5,
                borderColor: '#6A4029',
                color: '#6A4029',
                fontFamily: 'Poppins-SemiBold',
              }}
              iconStyle={{marginRight: -4}}
            />
          </View>
          <View className="w-full mx-auto">
            <DrawerItem
              label="Orders"
              onPress={() => {
                dispatch(getDataOrder());
                props.navigation.navigate('Order');
              }}
              icon={() => (
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/buy.png')}
                  style={{width: 20, height: 20}}
                />
              )}
              labelStyle={{
                marginLeft: -16,
                borderBottomWidth: 1,
                paddingBottom: 5,
                borderColor: '#6A4029',
                color: '#6A4029',
                fontFamily: 'Poppins-SemiBold',
              }}
              iconStyle={{marginRight: -4}}
            />
          </View>
          <View className="w-full mx-auto">
            <DrawerItem
              label="All Menu"
              onPress={() => props.navigation.navigate('All Menu')}
              icon={() => (
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/menu.png')}
                  style={{width: 24, height: 24}}
                />
              )}
              labelStyle={{
                marginLeft: -16,
                borderBottomWidth: 1,
                paddingBottom: 5,
                borderColor: '#6A4029',
                color: '#6A4029',
                fontFamily: 'Poppins-SemiBold',
              }}
              iconStyle={{marginRight: -4}}
            />
          </View>
          {user.roles == 'admin' ? (
            <View className="w-full mx-auto">
              <DrawerItem
                label="Manage Order"
                onPress={() => props.navigation.navigate('Manage Order')}
                icon={() => (
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/priv.png')}
                    style={{width: 24, height: 24}}
                  />
                )}
                labelStyle={{
                  marginLeft: -16,
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                  borderColor: '#6A4029',
                  color: '#6A4029',
                  fontFamily: 'Poppins-SemiBold',
                }}
                iconStyle={{marginRight: -4}}
              />
            </View>
          ) : null}
          <View className="w-full mx-auto">
            <DrawerItem
              label="Security"
              onPress={() => props.navigation.navigate('Settings')}
              icon={() => (
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/sec.png')}
                  style={{width: 24, height: 24}}
                />
              )}
              labelStyle={{
                marginLeft: -16,
                borderBottomWidth: 1,
                paddingBottom: 5,
                borderColor: '#6A4029',
                color: '#6A4029',
                fontFamily: 'Poppins-SemiBold',
              }}
              iconStyle={{marginRight: -4}}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity className="items-center py-3" onPress={handleLogout}>
        <View className="flex-row my-auto mr-auto gap-4 pl-16">
          <Text className="text-[#6A4029] m-auto font-poppins-semibold">
            Sign-out
          </Text>
          <Icon name="long-arrow-right" size={24} color="#6A4029" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
function SideBar() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f0f0f0',
          width: 270,
          borderTopRightRadius: 30,
        },
        drawerContentStyle: {
          flex: 1,
          borderTopRightRadius: 20,
          paddingTop: 20,
          paddingBottom: 10,
        },
      }}
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="All Menu"
        component={DataList}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <Stack.Navigator initialRouteName="App Home">
      <Stack.Screen
        name="App Home"
        component={SideBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="All Menu"
        component={DataList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Password"
        component={EditPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Manage Order"
        component={ManageOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default App;
