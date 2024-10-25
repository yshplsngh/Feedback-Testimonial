import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import spaceReducer from '../space/spaceSlice';
import feedbackReducer from '../feedback/feedbackSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    space: spaceReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
