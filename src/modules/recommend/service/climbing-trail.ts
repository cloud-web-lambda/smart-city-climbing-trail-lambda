import { vworldApiClient } from '@/utils/apiClient';

export const getClimbingInfoApi = (params) => {
  const { lat, lng, buffer, page, size } = params;
  const geomFilter = `POINT(${lng} ${lat})`;

  return vworldApiClient
    .get('/req/data', {
      params: {
        service: 'data',
        request: 'GetFeature',
        format: 'json',
        data: 'LT_L_FRSTCLIMB',
        domain: 'https://wlxphet33q45c62r6n6px4vw7u0gbjzg.lambda-url.ap-northeast-2.on.aws/',
        geomFilter: geomFilter,
        buffer,
        page,
        size,
      },
    })
    .then((res) => res.data);
};
