import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../lib/manageFetch/api';
import { NewSpaceType } from './Types';
import { RootState } from '../app/store';

export const createNewSpace = createAsyncThunk(
  'space/createNewSpace',
  async (data: NewSpaceType) => {
    const url = '/api/space/new';
    return await api.post(url, data);
  },
);

const spaceSlice = createSlice({
  name: 'space',
  initialState: { isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewSpace.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewSpace.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getSpaceLoading = (state: RootState) => state.space.isLoading;
export default spaceSlice.reducer;
