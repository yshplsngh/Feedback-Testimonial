import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewSpaceType, UserSpacesType } from './Types';
import { api } from '../lib/manageFetch/api';

export const createNewSpace = createAsyncThunk(
  'space/createNewSpace',
  async (data: NewSpaceType) => {
    const url = '/api/space/new';
    return await api.post(url, data);
  },
);

export const getUserSpaces = createAsyncThunk(
  'space/getUserSpaces',
  async () => {
    const url = '/api/space/getUserSpaces';
    return await api.get<UserSpacesType[]>(url);
  },
);
