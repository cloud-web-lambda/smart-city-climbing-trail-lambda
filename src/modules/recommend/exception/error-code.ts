import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';
import { DIFFICULTY_KEY } from '@/modules/recommend/common/climbing-trail.common';

export const ERROR_MESSAGE = {
  MISSING_REQUIRED_PARAM: '필수 파라미터가 누락되었습니다.',
  VALID_DIFFICULTY_LEVELS: `난이도는 ${DIFFICULTY_KEY.join(', ')}중 하나여야 합니다.`,
  INVALID_CLOSEST_TRAIL: '범위 내 가까운 등산로를 찾을 수 없습니다.',
  NO_SUBWAY_STATIONS: '지하철역 정보가 없습니다.',
  NO_CLOSEST_STATION_FOUND: '가장 가까운 지하철 역 정보가 없습니다.',
};

export const ERROR_CODE: ErrorCodeMapper<typeof ERROR_MESSAGE> = {
  MISSING_REQUIRED_PARAM: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_REQUIRED_PARAM,
  },
  VALID_DIFFICULTY_LEVELS: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.VALID_DIFFICULTY_LEVELS,
  },
  INVALID_CLOSEST_TRAIL: {
    status: HttpStatus.NOT_FOUND,
    message: ERROR_MESSAGE.INVALID_CLOSEST_TRAIL,
  },
  NO_SUBWAY_STATIONS: {
    status: HttpStatus.NOT_FOUND,
    message: ERROR_MESSAGE.NO_SUBWAY_STATIONS,
  },
  NO_CLOSEST_STATION_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: ERROR_MESSAGE.NO_CLOSEST_STATION_FOUND,
  },
};
