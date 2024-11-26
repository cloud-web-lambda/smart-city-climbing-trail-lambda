import { dataPortalCsvApiClient } from '@/utils/apiClient';

export const getSubwayStationApi = async () => {
  const response = await dataPortalCsvApiClient.get('api/15099316/v1/uddi:6fa205e0-5ac8-4d45-b1a7-dcdcafb6cc8d', {
    params: {
      page: 1,
      perPage: 300,
    },
  });

  return response.data;
};
