import { apl, FetchResponseError } from '../manageFetch/api';

export type RequestData = Record<string, unknown>;

export default {
  async getUser(requestData?: RequestData) {
    const url = '/api/user';
    try {
      const response = await apl.get(url, requestData);
      console.log(response.json);
    } catch (error) {
      if (error instanceof FetchResponseError) {
        console.log(error.message);
        console.log(error.name);
        console.log(error.status);
        console.log(error.json);
        console.log(error.headers);
        console.log(error.endpoint);
      }
      throw error;
    }
  },
};

// interface UserType {
//   id: number;
//   username: string;
//   email: string;
//   createdAt: string;
// }
//
// export async function getUser(
//   requestData?: Record<string, unknown>,
// ): Promise<UserType> {
//   const url = '/api/user';
//   try {
//     const response = await apl.get<UserType>(url, requestData);
//     return response.json;
//   } catch (error) {
//     console.error(error);
//     // throw error; // Re-throw the error if you want calling code to handle it
//   }
// }
