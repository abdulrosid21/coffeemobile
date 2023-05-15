import {createSlice} from '@reduxjs/toolkit';

const addresSlice = createSlice({
  name: 'address',
  initialState: {},
  reducers: {
    addAdrress: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {addAdrress} = addresSlice.actions;
export default addresSlice.reducer;
