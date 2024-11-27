import { HttpStatus } from '@/common/constants/http-status';
import { ErrorCodeMapper } from '@/common/@types/common';

export const WEATHER_ERROR_MESSAGE = {
  NO_DATA_FOUND: 'No weather data found.',
  FETCH_FAILED: 'Failed to fetch weather data.',
};

export const WEATHER_ERROR_CODE: ErrorCodeMapper<typeof WEATHER_ERROR_MESSAGE> = {
  NO_DATA_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: WEATHER_ERROR_MESSAGE.NO_DATA_FOUND,
  },
  FETCH_FAILED: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: WEATHER_ERROR_MESSAGE.FETCH_FAILED,
  },
};
