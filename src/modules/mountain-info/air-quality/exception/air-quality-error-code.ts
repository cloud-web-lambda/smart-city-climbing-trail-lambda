import { HttpStatus } from '@/common/constants/http-status';
import { ErrorCodeMapper } from '@/common/@types/common';

export const AIR_QUALITY_ERROR_MESSAGE = {
  NO_STATION_FOUND: 'No nearby station found.',
  NO_DATA_FOUND: 'No air quality data found.',
};

export const AIR_QUALITY_ERROR_CODE: ErrorCodeMapper<typeof AIR_QUALITY_ERROR_MESSAGE> = {
  NO_STATION_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: AIR_QUALITY_ERROR_MESSAGE.NO_STATION_FOUND,
  },
  NO_DATA_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: AIR_QUALITY_ERROR_MESSAGE.NO_DATA_FOUND,
  },
};
