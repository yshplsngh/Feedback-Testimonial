import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProcessedResponse } from '../lib/manageFetch/api';
import { BNewSpacesType } from './types';
import { RootState } from '../app/store';
import { getUserSpaces } from './spaceApi';

const spacesAdapter = createEntityAdapter<BNewSpacesType>();

const initialState = spacesAdapter.getInitialState();

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserSpaces.fulfilled,
      (state, action: PayloadAction<ProcessedResponse<BNewSpacesType[]>>) => {
        spacesAdapter.upsertMany(state, action.payload.json);
      },
    );
  },
});

export const {
  selectAll: selectAllSpaces,
  selectById: selectSpaceById,
  selectIds: selectSpaceIds,
} = spacesAdapter.getSelectors((state: RootState) => state.space);

export default spaceSlice.reducer;
