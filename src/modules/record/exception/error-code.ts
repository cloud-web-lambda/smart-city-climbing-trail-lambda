import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';

export const ERROR_MESSAGE = {
  MISSING_REQUIRED_PARAM: '필수 파라미터가 누락되었습니다.',
  NOT_FOUND: '사용자의 등산기록이 존재하지 않습니다.',
  NOT_FORMAT: 'year, month의 형식이 올바르지 않습니다.',
  MISSING_ACCESS_TOKEN: '액세스 토큰이 누락되었습니다.'
};

export const ERROR_CODE: ErrorCodeMapper<typeof ERROR_MESSAGE> = {
  MISSING_REQUIRED_PARAM: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_REQUIRED_PARAM,
  },
  NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.NOT_FOUND,
  },
  NOT_FORMAT: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.NOT_FORMAT,
  },
  MISSING_ACCESS_TOKEN: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_ACCESS_TOKEN,
  },
};
