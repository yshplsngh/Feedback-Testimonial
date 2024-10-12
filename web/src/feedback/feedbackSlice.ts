import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { api, ProcessedResponse } from '../lib/manageFetch/api';
import { BFeedbackTypeWSAS, FeedbackTypeWSAS } from './types';

export const getFeedbackFormInfo = createAsyncThunk(
  'feedback/getFeedbackFormInfo',
  async (spaceName: string) => {
    const url = `/api/space/spaceInfo/${spaceName}`;
    return await api.get<ExtraFormInfo>(url);
  },
);

export const submitFeedback = createAsyncThunk(
  'feedback/submitFeedback',
  async (data: FeedbackTypeWSAS) => {
    const url = '/api/feedback/submitFeedback';
    return await api.post(url, data);
  },
);

export const getFeedbacks = createAsyncThunk(
  'feedback/getFeedbacks',
  async (spaceName: string) => {
    const url = `/api/feedback/getFeedbacks/${spaceName}`;
    return await api.get<BFeedbackTypeWSAS[]>(url);
  },
);

export const setFavoriteFeedback = createAsyncThunk(
  'feedback/setFavoriteFeedback',
  async (feedbackId: number) => {
    const url = `/api/feedback/setFavoriteFeedback/${feedbackId}`;
    return await api.post<BFeedbackTypeWSAS>(url);
  },
);

interface ExtraFormInfo {
  customMessage: null | string;
  question: null | string;
}

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
