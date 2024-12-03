import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';

export const ERROR_MESSAGE = {
  MISSING_REQUIRED_PARAM: '필수 파라미터가 누락되었습니다.',
  USER_NOT_FOUND: '몸무게 정보를 저장하지 않았습니다.',
  MISSING_ACCESS_TOKEN: '액세스 토큰이 누락되었습니다.',
};

export const ERROR_CODE: ErrorCodeMapper<typeof ERROR_MESSAGE> = {
  MISSING_REQUIRED_PARAM: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_REQUIRED_PARAM,
  },
  USER_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.USER_NOT_FOUND,
  },
  MISSING_ACCESS_TOKEN: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_ACCESS_TOKEN,
  },
};
