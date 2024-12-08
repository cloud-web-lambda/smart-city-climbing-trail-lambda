import { ApiClient } from '@/utils/apiClient';

export const getWeightApi = async (accessToken: string) => {
  const response = await ApiClient.get('/hikers', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  return response.data.weight; // 응답에서 weight 값 반환
};
