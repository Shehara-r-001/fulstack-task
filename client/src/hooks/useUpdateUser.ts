import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { IResponse } from '@/models/Response.model';

const updatePoints = async ({
  userId,
  points,
}: {
  userId: number;
  points: number;
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
  const VERSION = import.meta.env.VITE_API_VERSION as string;

  const response: AxiosResponse<IResponse<boolean>> = await axios.patch(
    `${BASE_URL}/${VERSION}/users/${userId}`,
    { points }
  );

  return response.data.data;
};

export const useUpdatePoints = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePoints, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Users']);
    },
    onError: (error) => {
      console.error('Error updating points:', error);
    },
  });
};
