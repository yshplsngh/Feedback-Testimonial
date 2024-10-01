import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/manageFetch/api';
import { UserData } from './types';

export const fetchUserInfo = createAsyncThunk('/api/user', async () => {
  const url = '/api/user';
  return await api.get<UserData>(url);
});

export const logoutUser = createAsyncThunk('/api/auth/logout', async () => {
  const url = '/api/auth/logout';
  return await api.post(url);
});
