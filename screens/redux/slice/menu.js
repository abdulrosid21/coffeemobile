import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApiIntances from '../../utils/axios';

export const getDetailMenu = createAsyncThunk(
  'menu/getDetailMenu',
  async payload => {
    const result = await axiosApiIntances.get(`/menus/${payload}`);
    return result.data.data[0];
  },
);

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
};

const userSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDetailMenu.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getDetailMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDetailMenu.rejected, state => {
        state.isLoading = false;
        state.data = {};
      });
  },
});

export default userSlice.reducer;
