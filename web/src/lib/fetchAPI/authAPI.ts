import { apl } from '../manageFetch/api';

interface UserType {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export async function getUser(
  requestData?: Record<string, unknown>,
): Promise<UserType> {
  const url = '/api/user';
  try {
    const response = await apl.get<UserType>(url, requestData);
    return response.json;
  } catch (error) {
    console.error(error);
    // throw error; // Re-throw the error if you want calling code to handle it
  }
}
