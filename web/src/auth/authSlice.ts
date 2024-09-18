import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api, ProcessedResponse } from '../lib/manageFetch/api';
import { RootState } from '../app/store';

interface UserData {
  id: number | null;
  googleId: string | null;
  userName: string | null;
  name: string | null;
  email: string | null;
  pictureUrl: string | null;
  authProvider: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

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

export const fetchUserInfo = createAsyncThunk('api/user', async () => {
  const url = '/api/user';
  return await api.get<UserData>(url);
});

export const logoutUser = createAsyncThunk('/api/auth/logout', async () => {
  const url = '/api/auth/logout';
  return await api.post(url);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // startLoading(state){
    //   state.mainLoading = true
    // },
    // stopLoading(state){
    //   state.mainLoading = false
    // }
  },
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
        state.userData = initialState.userData;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.userData;
export const selectStatusLoading = (state: RootState) =>
  state.auth.statusLoading;

export default authSlice.reducer;
