import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import usersReducer from '../users/usersSlice';

// Define the shape of your root state
export type RootState = {
  users: ReturnType<typeof usersReducer>;
};

// Create the store with the appropriate type
export const store: EnhancedStore<RootState> = configureStore({
  reducer: {
    users: usersReducer
  }
});

// Export a typed hook for use throughout your application
export type AppDispatch = typeof store.dispatch;