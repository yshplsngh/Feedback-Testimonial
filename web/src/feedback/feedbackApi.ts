import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/manageFetch/api';
import { BFeedbackTypeWSAS, ExtraFormInfo, FeedbackTypeWSAS } from './types';

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
