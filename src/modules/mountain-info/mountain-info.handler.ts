import { APIGatewayProxyHandler } from 'aws-lambda';
import { HttpStatus } from '@/common/constants/http-status';
import { getWeatherAlert } from '@/modules/mountain-info/weather/service/weather';
import { getAirQuality } from '@/modules/mountain-info/air-quality/service/air-quality';
import { getSunTimes } from '@/modules/mountain-info/sun-time/service/sun-time';
import { getCoordinatesByTrailName } from '@/utils/coordinates';

interface QueryStringParameters {
  trailName?: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const queryStringParameters = event.queryStringParameters as QueryStringParameters;

    if (!queryStringParameters?.trailName) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        body: JSON.stringify({ message: 'trailName is required.' }),
      };
    }

    const { trailName } = queryStringParameters;

    // 위도와 경도 가져오기
    const { lat, lng } = await getCoordinatesByTrailName(trailName);

    // 병렬 처리
    const results = await Promise.allSettled([
      getWeatherAlert(lat, lng),
      getAirQuality(lat, lng),
      getSunTimes(lat, lng),
    ]);

    const response: Record<string, any> = {};
    const errors: Array<string> = [];

    results.forEach((result, index) => {
      const apiName = ['weather', 'airQuality', 'sunTimes'][index];
      if (result.status === 'fulfilled') response[apiName] = result.value;
      else {
        response[apiName] = null;
        const errorMessage = result.reason instanceof Error ? result.reason.message : String(result.reason);
        errors.push(`${apiName} API Error: ${errorMessage}`);
      }
    });

    if (errors.length > 0) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({ message: 'Errors occurred', errors, data: response }),
      };
    }

    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error in mountain-info handler:', error);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
