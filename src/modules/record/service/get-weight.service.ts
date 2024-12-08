import { ApiClient } from '@/utils/apiClient';

export const getWeightApi = async (accessToken: string) => {
  const response = await ApiClient.get('/hikers', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  return response.data.weight || null;
};
