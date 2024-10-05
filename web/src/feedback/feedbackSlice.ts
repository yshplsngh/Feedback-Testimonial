import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { api, ProcessedResponse } from '../lib/manageFetch/api';
import { FeedbackTypeWSS } from './types';

export const getFeedbackFormInfo = createAsyncThunk(
  'feedback/getFeedbackFormInfo',
  async (spaceName: string) => {
    const url = `/api/space/spaceInfo/${spaceName}`;
    return await api.get<ExtraFormInfo>(url);
  },
);

export const submitFeedback = createAsyncThunk(
  'feedback/submitFeedback',
  async (data: FeedbackTypeWSS) => {
    const url = '/api/feedback/submitFeedback';
    return await api.post(url, data);
  },
);

interface ExtraFormInfo {
  customMessage: null | string;
  question: null | string;
}

interface InitialState {
  extraFormInfo: ExtraFormInfo;
}

const initialState: InitialState = {
  extraFormInfo: {
    customMessage: null,
    question: null,
  },
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
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
      });
  },
});

export const getExtraFormInfo = (state: RootState) =>
  state.feedback.extraFormInfo;
export default feedbackSlice.reducer;
