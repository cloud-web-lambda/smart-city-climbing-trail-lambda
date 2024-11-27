import axios from 'axios';
import { SunTimeDTO } from '@/modules/mountain-info/sun-time/dto/sun-time.dto';
import { SunTimeException } from '../exception/sun-time.exception';
import { SUN_TIME_ERROR_CODE } from '../exception/sun-time-error-code';

// Sunrise-Sunset API URL
const SUNRISE_SUNSET_API_URL = 'https://api.sunrise-sunset.org/json';

export const getSunTimes = async (lat: number, lng: number): Promise<SunTimeDTO> => {
  try {
    const start = Date.now();
    const response = await axios.get(SUNRISE_SUNSET_API_URL, {
      params: {
        lat,
        lng,
        date: 'today',
        tzid: 'Asia/Seoul', // 서울 시간대
      },
    });
    console.log('sun-time API call took:', Date.now() - start, 'ms');

    if (!response.data.results) {
      throw new SunTimeException(SUN_TIME_ERROR_CODE.NO_DATA_FOUND);
    }

    const { sunrise, sunset } = response.data.results;

    return new SunTimeDTO({
      sunrise,
      sunset,
    });
  } catch (error: any) {
    console.error('Error fetching sun times:', {
      message: error.message,
      response: error.response?.data,
    });
    throw new SunTimeException(SUN_TIME_ERROR_CODE.FETCH_FAILED);
  }
};
