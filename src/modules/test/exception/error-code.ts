import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';

export const TEST_ERROR_MESSAGE = {
  NAME_REQUIRED: '이름이 필요합니다.',
  AGE_HAS_TO_BE_NUMBER: '나이는 숫자여야 합니다.',
};

export const TEST_ERROR_CODE: ErrorCodeMapper<typeof TEST_ERROR_MESSAGE> = {
  NAME_REQUIRED: {
    status: HttpStatus.BAD_REQUEST,
    message: TEST_ERROR_MESSAGE.NAME_REQUIRED,
  },
  AGE_HAS_TO_BE_NUMBER: {
    status: HttpStatus.BAD_REQUEST,
    message: TEST_ERROR_MESSAGE.AGE_HAS_TO_BE_NUMBER,
  },
};
