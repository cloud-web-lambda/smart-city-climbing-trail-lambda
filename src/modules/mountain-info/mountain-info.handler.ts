import { createGatewayHandler } from '@/lambda/index';
import { HttpStatus } from '@/common/constants/http-status';
import { getWeatherAlert } from '@/modules/mountain-info/weather/service/weather';
import { getAirQuality } from '@/modules/mountain-info/air-quality/service/air-quality';
import { getSunTimes } from '@/modules/mountain-info/sun-time/service/sun-time';
import { getCoordinatesByTrailName } from '@/utils/coordinates';

interface QueryStringParameters {
  trailName?: string;
}

export const handler = createGatewayHandler(async (req, res) => {
  // query 타입 안전성 확보
  const queryStringParameters = req.query as QueryStringParameters;

  if (!queryStringParameters.trailName) {
    return res({
      status: HttpStatus.BAD_REQUEST,
      body: { message: 'trailName is required.' },
    });
  }

  const { trailName } = queryStringParameters;

  // 위도와 경도 가져오기
  const { lat, lng } = await getCoordinatesByTrailName(trailName);

  // 병렬 처리
  const start = Date.now();
  const results = await Promise.allSettled([getWeatherAlert(lat, lng), getAirQuality(lat, lng), getSunTimes(lat, lng)]);
  console.log('Execution times:', Date.now() - start);

  // 디버깅 편의성을 위한 결과 처리
  const response: Record<string, any> = {};
  const errors: Array<string> = [];

  results.forEach((result, index) => {
    const apiName = ['weather', 'airQuality', 'sunTimes'][index];
    if (result.status === 'fulfilled') response[apiName] = result.value;
    // result.status === 'rejected'
    else {
      response[apiName] = null;
      const errorMessage = result.reason instanceof Error ? result.reason.message : String(result.reason);
      errors.push(`${apiName} API Error: ${errorMessage}`);
    }
  });

  if (errors.length > 0) {
    return res({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: { message: 'Errors occurred', errors, data: response },
    });
  }

  return res({
    status: HttpStatus.OK,
    body: response,
  });
});
