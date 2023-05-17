import {combineReducers} from '@reduxjs/toolkit';
import user from './slice/user';
import menu from './slice/menu';
import cart from './slice/cart';
import address from './slice/address';
import orders from './slice/orders';
const rootReducer = combineReducers({
  user: user,
  menu: menu,
  cart: cart,
  address: address,
  orders: orders,
});

export default rootReducer;
