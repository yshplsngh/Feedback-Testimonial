import { createSlice } from '@reduxjs/toolkit';
import { api } from '../lib/manageFetch/api';

// import { api } from '../lib/manageFetch/api';

interface UsersState {
  userData: {
    id: number;
    name: string;
    email: string;
    pictureUrl: string;
  };
}

const initialState: UsersState = {
  userData: {
    id: 0,
    name: '',
    email: '',
    pictureUrl: '',
  },
};

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts',async ()=>{
//   const response = await axios.get<Post[]>(POSTS_URL)
//   return response.data;
//   }
// )

export const fetchUserInfo = async () => {
  const url = '/api/users';
  const response = await api.get(url);
  return response.json;
};

// export const fetchUserInfo = createAsyncThunk('api/user', async (requestData?: RequestData) => {
//   const url = '/api/user';
//   try {
//   const response = await axios.get(API_URL+url);
//   return response.data;
//   } catch (error) {
//
//   if (error instanceof FetchResponseError) {
//     console.log(error.message);
//     console.log(error.name);
//     console.log(error.status);
//     console.log(error.json);
//     console.log(error.headers);
//     console.log(error.endpoint);
//   }
//
//   throw error;
//   }
// });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setUserInfo(state,action) {
    //   state.userData = action.payload
    //   console.log(action)
    // }
  },
  // extraReducers(builder) {
  // builder.addCase(fetchUserInfo, (state, action) => {
  //   console.log(action.payload);
  // });
  // .addCase(fetchUserInfo.rejected, (state, action) => {
  //   console.log(action);
  // });
  // builder.addCase(fetchPosts.fulfilled,(state, action:PayloadAction<Post[]>) => {
  //   state.post = action.payload;
  // })
  // },
});

// export const selectAllPosts = (state:RootState) => state.users.post;

export const { setUserInfo } = usersSlice.actions;
export default usersSlice.reducer;
