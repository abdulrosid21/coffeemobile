import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApiIntances from '../../utils/axios';

export const getDataUserById = createAsyncThunk(
  'user/getDataUserById',
  async () => {
    const result = await axiosApiIntances.get('users/');
    return result.data.data;
  },
);

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDataUserById.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getDataUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDataUserById.rejected, state => {
        state.isLoading = false;
        state.data = {};
      });
  },
});

export default userSlice.reducer;
