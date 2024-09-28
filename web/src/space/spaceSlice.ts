import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProcessedResponse } from '../lib/manageFetch/api';
import { UserSpacesType } from './types';
import { RootState } from '../app/store';
import { createNewSpace, getUserSpaces } from './spaceApi';

const spacesAdapter = createEntityAdapter<UserSpacesType>();

const initialState = spacesAdapter.getInitialState({
  isLoading: false,
});

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewSpace.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewSpace.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserSpaces.fulfilled,
        (state, action: PayloadAction<ProcessedResponse<UserSpacesType[]>>) => {
          spacesAdapter.upsertMany(state, action.payload.json);
          state.isLoading = false;
        },
      )
      .addCase(getUserSpaces.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserSpaces.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const {
  selectAll: selectAllSpaces,
  selectById: selectSpaceById,
  selectIds: selectSpaceIds,
} = spacesAdapter.getSelectors((state: RootState) => state.space);

export const getSpaceLoading = (state: RootState) => state.space.isLoading;
export default spaceSlice.reducer;
