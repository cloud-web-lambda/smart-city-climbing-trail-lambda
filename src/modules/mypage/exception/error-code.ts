import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';
import { DIFFICULTY_KEY } from '@/modules/recommend/common/climbing-trail.common';

export const ERROR_MESSAGE = {
  MISSING_REQUIRED_PARAM: '필수 파라미터가 누락되었습니다.',
  USER_NOT_FOUND: '저장된 사용자가 아닙니다.',
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
};
