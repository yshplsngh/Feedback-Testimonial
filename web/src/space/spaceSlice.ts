import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProcessedResponse } from '../lib/manageFetch/api';
import { BNewSpacesType } from './types';
import { RootState } from '../app/store';
import { getUserSpace, getUserSpaces } from './spaceApi';

const spacesAdapter = createEntityAdapter<BNewSpacesType>();

const initialState = spacesAdapter.getInitialState();

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    deleteRSpace: (state, action: { payload: { spaceId: number } }) => {
      const spaceExist = state.entities[action.payload.spaceId];
      if (spaceExist) {
        spacesAdapter.removeOne(state, action.payload.spaceId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserSpaces.fulfilled,
        (state, action: PayloadAction<ProcessedResponse<BNewSpacesType[]>>) => {
          spacesAdapter.upsertMany(state, action.payload.json);
        },
      )
      .addCase(
        getUserSpace.fulfilled,
        (state, action: PayloadAction<ProcessedResponse<BNewSpacesType>>) => {
          spacesAdapter.upsertOne(state, action.payload.json);
        },
      );
  },
});

export const {
  selectAll: selectAllSpaces,
  selectById: selectSpaceById,
  selectIds: selectSpaceIds,
} = spacesAdapter.getSelectors((state: RootState) => state.space);

export const selectSpaceBySpaceName = createSelector(
  [selectAllSpaces, (_state: RootState, spaceName) => spaceName],
  (spaces, spaceName) => spaces.find((space) => space.spaceName === spaceName),
);

export const { deleteRSpace } = spaceSlice.actions;
export default spaceSlice.reducer;
