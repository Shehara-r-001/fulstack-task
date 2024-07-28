import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { IResponse } from '@/models/Response.model';
import { IUser } from '@/models/User.model';

const useGetUserById = (userId: string | null) => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
  const VERSION = import.meta.env.VITE_API_VERSION as string;

  return useQuery(
    ['User', userId],
    async () => {
      if (userId) {
        const response: AxiosResponse<IResponse<IUser>> = await axios.get(
          `${BASE_URL}/${VERSION}/users/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        return response.data.data;
      } else {
        return null;
      }
    },
    { cacheTime: 0 }
  );
};

export default useGetUserById;
