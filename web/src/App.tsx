import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Outlet />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

// export default function App() {
//   const [error,setError] = useState<string>('')
//   const handleSubmit = async () => {
//     const response = await getUser();
//     if(response instanceof FetchResponseError){
//       setError(response.message)
//     }else{
//       console.log(response);
//     }
//   };
//
//   return (
//     <main>
//       <button onClick={() => handleSubmit()}>fake</button>
//       <br />
//       <button
//         onClick={() => {
//           window.open('http://localhost:4000/api/auth/google', '_self');
//         }}
//       >
//         login
//       </button>
//       <button>
//
//       </button>
//     </main>
//   )
//
// }

// import { useState} from 'react';
// import { createRequestParams, RequestParams } from './lib/manageFetch/requestParams';
// import api from './lib/fetchAPI/authAPI';
//
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAllNames, userAdd } from './users/usersSlice.ts';
// import { AppDispatch } from './app/store.ts';
// import authApi from './lib/fetchAPI/authAPI.ts';

// import { getUser } from './lib/fetchAPI/authAPI.ts';
//
// export default function app() {
// const dispatch = useDispatch<AppDispatch>();
// const users = useSelector(selectAllNames);

// console.log(users);

// const hlogin = () => {
//   dispatch(userAdd("yashpal"))
// }

// const [data, setData] = useState(null);

// };
// const huser = async () => {
//   try {
//     getUser({ name: 'Rashpal' }).then((data) => console.log(data));
//     getUser({ username: 'Rashpal' }).then((data) => console.log(data));
//     getUser().then((data) => console.log(data));
//   } catch (error) {
//     console.error('Failed to fetch user data:', error);
//   }
// };
// const reactionEmoji = {
//   thumbsUp: '👍',
//   wow: '😮',
//   heart: '❤️',
//   rocket: '🚀',
//   coffee: '☕',
// };
// console.log(Object.entries(reactionEmoji));
// const data = Object.entries(reactionEmoji).map(([key,value])=>{
//   console.log({key,value})
// })
// console.log(data);

// const huser = async () => {
//   try {
//     const data = await api.getUser(new createRequestParams());
//     console.log(data);
//   } catch (error) {
//     console.error('Failed to fetch user data:', error);
//   }
// };

// async function getUser() {
//   const url = '/api/user';
//   const requestParams: RequestParams = {
//     data: { userId: 123 },  // This will be converted to query parameters for GET requests
//     headers: {
//       'Authorization': 'Bearer your-token-here',
//       'Custom-Header': 'Some-Value'
//     }
//   };
//
//   const response = await api.get<UserType>(url, requestParams);
//   console.log(response);
//   return response.json;
// }

// Usage
//   const user = await authApi.function(123);
//   console.log(user.username); // TypeScript now knows that 'user' is of type UserType

//   return (
//     <main>
//       <button onClick={() => huser()}>login</button>
//     </main>
//   );
// }
