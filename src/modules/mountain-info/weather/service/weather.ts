import { dataPortalApiClient } from '@/utils/apiClient';

export const getWeatherAlert = async (lat: number, lon: number) => {
  // 좌표 변환 및 API 요청 로직
  const nx = 60; // 예시 좌표
  const ny = 127; // 예시 좌표
  const response = await dataPortalApiClient.get('/weather/api', {
    params: { nx, ny },
  });

  return response.data;
};
