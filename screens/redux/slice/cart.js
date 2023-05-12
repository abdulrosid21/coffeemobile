import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addMenusToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(c => c.id !== action.payload);
    },
    addCartQty: (state, action) => {
      state.cart = state.cart.map(c =>
        c.id === action.payload ? {...c, qty: c.qty + 1} : c,
      );
    },
    minusCartQty: (state, action) => {
      state.cart = state.cart.map(c => {
        return c.id === action.payload ? {...c, qty: c.qty - 1} : {...c};
      });
    },
  },
});

export const {addMenusToCart, removeFromCart, addCartQty, minusCartQty} =
  cartSlice.actions;

export default cartSlice.reducer;
