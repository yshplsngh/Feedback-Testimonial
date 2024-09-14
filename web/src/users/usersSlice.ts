import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api, ProcessedResponse } from '../lib/manageFetch/api';

interface UserData {
  id: number;
  name: string;
  email: string;
  pictureUrl: string;
}

interface UsersState {
  userData: UserData;
}

const initialState: UsersState = {
  userData: {
    id: 0,
    name: '',
    email: '',
    pictureUrl: '',
  },
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
    builder.addCase(
      fetchUserInfo.fulfilled,
      (state, action: PayloadAction<ProcessedResponse<UserData>>) => {
        // when id is not present, user not exist in cookies , in response we are getting a empty object
        if (!action.payload.json.id) {
          state.userData = initialState.userData;
        } else {
          const { id, pictureUrl, name, email } = action.payload.json;
          state.userData = { id, pictureUrl, name, email };
        }
      },
    );
  },
});

export default usersSlice.reducer;
