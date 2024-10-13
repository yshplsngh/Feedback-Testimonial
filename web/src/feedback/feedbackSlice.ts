import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ProcessedResponse } from '../lib/manageFetch/api';
import { BFeedbackTypeWSAS, ExtraFormInfo } from './types';
import {
  getFeedbackFormInfo,
  getFeedbacks,
  setFavoriteFeedback,
} from './feedbackApi';

const feedbackAdapter = createEntityAdapter<BFeedbackTypeWSAS>();

const initialState = feedbackAdapter.getInitialState<{
  extraFormInfo: ExtraFormInfo;
}>({
  extraFormInfo: {
    customMessage: null,
    question: null,
  },
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    toggleFavorite: (
      state,
      action: { payload: { feedbackId: number; explicitValue: boolean } },
    ) => {
      const feedbackExist = state.entities[action.payload.feedbackId];
      if (feedbackExist) {
        feedbackAdapter.updateOne(state, {
          id: feedbackExist.id,
          changes: { favorite: action.payload.explicitValue },
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getFeedbackFormInfo.fulfilled,
        (state, action: PayloadAction<ProcessedResponse<ExtraFormInfo>>) => {
          state.extraFormInfo = action.payload.json;
        },
      )
      .addCase(getFeedbackFormInfo.rejected, (state) => {
        state.extraFormInfo = initialState.extraFormInfo;
      })
      .addCase(
        getFeedbacks.fulfilled,
        (
          state,
          action: PayloadAction<ProcessedResponse<BFeedbackTypeWSAS[]>>,
        ) => {
          feedbackAdapter.upsertMany(state, action.payload.json);
        },
      )
      .addCase(
        setFavoriteFeedback.fulfilled,
        (
          state,
          action: PayloadAction<ProcessedResponse<BFeedbackTypeWSAS>>,
        ) => {
          feedbackAdapter.updateOne(state, {
            id: action.payload.json.id,
            changes: action.payload.json,
          });
        },
      );
  },
});

export const {
  selectAll: selectAllFeedbacks,
  selectById: selectFeedbackById,
  selectIds: selectFeedbackIds,
} = feedbackAdapter.getSelectors((state: RootState) => state.feedback);

export const selectFeedbacksBySpaceId = createSelector(
  [selectAllFeedbacks, (_state: RootState, spaceId) => spaceId],
  (feedbacks, spaceId) =>
    feedbacks.filter((feedback) => feedback.spaceId === spaceId),
);

export const getExtraFormInfo = (state: RootState) =>
  state.feedback.extraFormInfo;

export const { toggleFavorite } = feedbackSlice.actions;
export default feedbackSlice.reducer;
