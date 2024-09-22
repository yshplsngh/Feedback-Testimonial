import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import spaceReducer from '../space/spaceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    space: spaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
