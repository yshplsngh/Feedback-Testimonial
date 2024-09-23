import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcessedResponse } from '../lib/manageFetch/api';
import { RootState } from '../app/store';
import { fetchUserInfo, logoutUser } from './authApi';
import { UserData } from './types';

interface authState {
  userData: UserData;
  statusLoading: boolean;
}

const initialState: authState = {
  userData: {
    id: null,
    googleId: null,
    userName: null,
    name: null,
    email: null,
    pictureUrl: null,
    authProvider: null,
    createdAt: null,
    updatedAt: null,
  },
  statusLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<ProcessedResponse<UserData>>) => {
          console.log(action.payload.json);
          state.statusLoading = false;
          // when id is not present, mean cookies is expired, in response we are getting an empty object.
          if (!action.payload.json.id) {
            state.userData = initialState.userData;
          } else {
            state.userData = action.payload.json;
          }
        },
      )
      .addCase(fetchUserInfo.rejected, (state) => {
        state.statusLoading = false;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.statusLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.statusLoading = false;
        state.userData = initialState.userData;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.statusLoading = false;
        if (action.error.code === '401') {
          state.userData = initialState.userData;
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.statusLoading = true;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.userData;
export const selectStatusLoading = (state: RootState) =>
  state.auth.statusLoading;

export default authSlice.reducer;
