import {combineReducers} from '@reduxjs/toolkit';
import user from './slice/user';
import menu from './slice/menu';
const rootReducer = combineReducers({
  user: user,
  menu: menu,
});

export default rootReducer;
