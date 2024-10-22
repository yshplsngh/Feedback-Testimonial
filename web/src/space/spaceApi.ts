import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewSpaceType, BNewSpacesType, EditedSpaceWithIdType } from './types';
import { api } from '../lib/manageFetch/api';

export const createNewSpace = createAsyncThunk(
  'space/createNewSpace',
  async (data: NewSpaceType) => {
    const url = '/api/space/new';
    return await api.post(url, data);
  },
);

export const getUserSpace = createAsyncThunk(
  'space/getUserSpace',
  async (spaceName: string) => {
    const url = `/api/space/getUserSpace/${spaceName}`;
    return await api.get<BNewSpacesType>(url);
  },
);

export const getUserSpaces = createAsyncThunk(
  'space/getUserSpaces',
  async () => {
    const url = '/api/space/getUserSpaces';
    return await api.get<BNewSpacesType[]>(url);
  },
);

export const editSpace = createAsyncThunk(
  'space/editSpace',
  async (data: EditedSpaceWithIdType) => {
    const url = '/api/space/edit';
    return await api.put(url, data);
  },
);

export const deleteUserSpace = createAsyncThunk(
  'space/deleteUserSpace',
  async (spaceId: number) => {
    const url = `/api/space/delete/${spaceId}`;
    return await api.delete(url);
  },
);
