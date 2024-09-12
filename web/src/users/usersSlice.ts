import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../App/store';

// Define the type for the state
interface UsersState {
  names: string[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Define the initial state with the type
const initialState: UsersState = {
  names: [],
  status: 'idle',
  error: null,
};

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdd: {
      reducer: (state, action: PayloadAction<string>) => {
        state.names.push(action.payload);
      },
      prepare(name: string) {
        return {
          payload: name,
        };
      },
    },
  },
});

export const selectAllNames = (state: RootState) => state.users.names;
export const { userAdd } = usersSlice.actions;
export default usersSlice.reducer;
