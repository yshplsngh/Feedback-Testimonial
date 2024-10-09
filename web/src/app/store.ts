import { configureStore, Middleware } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import spaceReducer from '../space/spaceSlice';
import feedbackReducer from '../feedback/feedbackSlice';

const unauthorizedMiddleware: Middleware = () => (next) => (action) => {
  // if (action.payload?.status === 401) {
  //   dispatch(logout());
  // }
  // if(action.error){
  //   console.log(typeof action.error.code);
  // }
  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    space: spaceReducer,
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(unauthorizedMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
