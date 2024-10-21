import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewSpaceType, BNewSpacesType } from './types';
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
    return await api.get<BNewSpacesType[]>(url);
  },
);

export const deleteUserSpace = createAsyncThunk(
  'space/deleteUserSpace',
  async (spaceName: string) => {
    const url = `/api/space/delete/${spaceName}`;
    return await api.delete(url);
  },
);
