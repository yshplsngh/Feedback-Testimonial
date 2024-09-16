import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api, ProcessedResponse } from '../lib/manageFetch/api';
import { RootState } from '../app/store';

interface UserData {
  id: number | null;
  googleId: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  pictureUrl: string | null;
  authProvider: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface UsersState {
  userData: UserData;
  status: 'pending' | 'fulfilled';
}

const initialState: UsersState = {
  userData: {
    id: null,
    googleId: null,
    username: null,
    name: null,
    email: null,
    pictureUrl: null,
    authProvider: null,
    createdAt: null,
    updatedAt: null,
  },
  status: 'pending',
};

export const fetchUserInfo = createAsyncThunk('api/user', async () => {
  const url = '/api/user';
  return await api.get<UserData>(url);
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<ProcessedResponse<UserData>>) => {
          console.log(action.payload.json);
          state.status = 'fulfilled';
          // when id is not present, mean cookies is expired, in response we are getting an empty object.
          if (!action.payload.json.id) {
            state.userData = initialState.userData;
          } else {
            state.userData = action.payload.json;
          }
        },
      )
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'pending';
      });
  },
});

export const selectUser = (state: RootState) => state.users.userData;
export const selectUserStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
