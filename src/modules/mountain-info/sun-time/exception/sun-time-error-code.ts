import { HttpStatus } from '@/common/constants/http-status';
import { ErrorCodeMapper } from '@/common/@types/common';

export const SUN_TIME_ERROR_MESSAGE = {
  NO_DATA_FOUND: 'Sun time data could not be found for the given coordinates.',
  FETCH_FAILED: 'Failed to retrieve sun time data from the API.',
};

export const SUN_TIME_ERROR_CODE: ErrorCodeMapper<typeof SUN_TIME_ERROR_MESSAGE> = {
  NO_DATA_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: SUN_TIME_ERROR_MESSAGE.NO_DATA_FOUND,
  },
  FETCH_FAILED: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: SUN_TIME_ERROR_MESSAGE.FETCH_FAILED,
  },
};
