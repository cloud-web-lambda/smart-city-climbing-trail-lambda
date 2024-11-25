import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';

export const DB_TEST_ERROR_MESSAGE = {
  NAME_REQUIRED: '이름이 필요합니다.',
  AGE_INVALID: '나이는 유효한 숫자여야 합니다.',
};

export const DB_TEST_ERROR_CODE: ErrorCodeMapper<typeof DB_TEST_ERROR_MESSAGE> = {
  NAME_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: DB_TEST_ERROR_MESSAGE.NAME_REQUIRED,
  },
  AGE_INVALID: {
    status: HttpStatus.BAD_REQUEST,
    message: DB_TEST_ERROR_MESSAGE.AGE_INVALID,
  },
};
