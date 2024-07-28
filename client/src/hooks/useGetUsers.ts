import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

import {
  IPaginatedResponse,
  IPaginationRequest,
} from '@/models/Pagination.model';
import { IResponse } from '@/models/Response.model';
import { IUser } from '@/models/User.model';

const useGetUsers = (
  paginationRequest: IPaginationRequest,
  staleTime = 15 * 60 * 1000
) => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
  const VERSION = import.meta.env.VITE_API_VERSION as string;

  const queryParams = new URLSearchParams();
  if (paginationRequest.page)
    queryParams.append('page', paginationRequest.page.toString());
  if (paginationRequest.pageSize)
    queryParams.append('pageSize', paginationRequest.pageSize.toString());

  return useQuery(
    ['Users', queryParams.toString()],
    async () => {
      const response: AxiosResponse<IResponse<IPaginatedResponse<IUser>>> =
        await axios.get(
          `${BASE_URL}/${VERSION}/users?${queryParams.toString()}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

      return response.data.data;
    },
    { staleTime }
  );

  // return { users: data?.data, isLoading, isError, error, refetch };
};

export default useGetUsers;
