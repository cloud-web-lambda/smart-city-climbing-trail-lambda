import { dataPortalApiClient } from '@/utils/apiClient';
import proj4 from 'proj4';
import { AirQualityDTO } from '@/modules/mountain-info/air-quality/dto/air-quality.dto';
import { AirQualityException } from '../exception/air-quality.exception';
import { AIR_QUALITY_ERROR_CODE } from '../exception/air-quality-error-code';

interface AirQualityData {
  fineDustIndex: number;
  ultrafineDustIndex: number;
}

const transformWGS84ToTM = (lat: number, lon: number): { tmX: number; tmY: number } => {
  const wgs84 = '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees';
  const tmMid = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';
  const [tmX, tmY] = proj4(wgs84, tmMid, [lon, lat]);
  return { tmX, tmY };
};

const getRealTimeAirQuality = async (stationName: string): Promise<AirQualityData> => {
  const response = await dataPortalApiClient.get('/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty', {
    params: {
      stationName,
      returnType: 'json',
      numOfRows: 1,
      pageNo: 1,
      dataTerm: 'DAILY',
      ver: '1.0',
    },
  });

  if (!response.data.response.body.items || response.data.response.body.items.length === 0) {
    throw new AirQualityException(AIR_QUALITY_ERROR_CODE.NO_DATA_FOUND);
  }

  const data = response.data.response.body.items[0];

  return {
    fineDustIndex: parseFloat(data.pm10Value),
    ultrafineDustIndex: parseFloat(data.pm25Value),
  };
};

export const getAirQuality = async (lat: number, lon: number): Promise<AirQualityDTO> => {
  const { tmX, tmY } = transformWGS84ToTM(lat, lon);

  const stationResponse = await dataPortalApiClient.get('/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList', {
    params: {
      returnType: 'json',
      tmX,
      tmY,
      ver: '1.1',
    },
  });

  if (!stationResponse.data.response.body.items || stationResponse.data.response.body.items.length === 0) {
    throw new AirQualityException(AIR_QUALITY_ERROR_CODE.NO_STATION_FOUND);
  }

  const stationName = stationResponse.data.response.body.items[0].stationName;
  const { fineDustIndex, ultrafineDustIndex } = await getRealTimeAirQuality(stationName);

  return new AirQualityDTO({
    fineDustIndex,
    ultrafineDustIndex,
  });
};
