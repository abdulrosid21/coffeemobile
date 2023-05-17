import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApiIntances from '../../utils/axios';

export const getDataOrder = createAsyncThunk('order/getDataOrder', async () => {
  const result = await axiosApiIntances.get('order/byuser');
  return result.data.data;
});

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDataOrder.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getDataOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDataOrder.rejected, state => {
        state.isLoading = false;
        state.data = {};
      });
  },
});

export default orderSlice.reducer;
