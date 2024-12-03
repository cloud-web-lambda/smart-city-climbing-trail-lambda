import { HttpStatus } from '@/common/constants/http-status';
import type { ErrorCodeMapper } from '@/common/@types/common';

export const ERROR_MESSAGE = {
  MISSING_REQUIRED_PARAM: '필수 파라미터가 누락되었습니다.',
  USER_NOT_FOUND: '저장된 사용자가 아닙니다.',
  MISSING_EMAIL_OR_PASSWORD: 'email 또는 비밀번호가 누락되었습니다.',
  MISSING_REFRESH_TOKEN_OR_EMAIL: 'refresh 토큰 또는 email이 누락되었습니다.',
  MISSING_ACCESS_TOKEN: 'Authorization header에 액세스 토큰이 누락되었습니다.',
  FAILD_RETRIEVE_SUB_FROM_ACCESS_TOKEN: '액세스 토큰으로부터 sub을 불러올 수 없습니다.',
  INVALID_TOKEN: '인증되지 않은 토큰입니다.',
  EXPIRED_TOKEN: '토큰이 만료되었습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  RESOURCE_NOT_FOUND: '지정된 리소스가 존재하지 않습니다.',
  MISSING_CONFIRMATIONCODE: '검증 코드가 누락되었습니다.'
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
  MISSING_REFRESH_TOKEN_OR_EMAIL: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_REFRESH_TOKEN_OR_EMAIL,
  },
  MISSING_ACCESS_TOKEN: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_ACCESS_TOKEN,
  },
  FAILD_RETRIEVE_SUB_FROM_ACCESS_TOKEN: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.FAILD_RETRIEVE_SUB_FROM_ACCESS_TOKEN,
  },
  INVALID_TOKEN: {
    status: HttpStatus.UNAUTHORIZED,
    message: ERROR_MESSAGE.INVALID_TOKEN,
  },
  EXPIRED_TOKEN: {
    status: HttpStatus.UNAUTHORIZED,
    message: ERROR_MESSAGE.EXPIRED_TOKEN,
  },
  UNKNOWN_ERROR: {
    status: HttpStatus.BAD_REQUEST, //500
    message: ERROR_MESSAGE.UNKNOWN_ERROR,
  },
  RESOURCE_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
  },
  MISSING_EMAIL_OR_PASSWORD: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_EMAIL_OR_PASSWORD,
  },
  MISSING_CONFIRMATIONCODE: {
    status: HttpStatus.BAD_REQUEST,
    message: ERROR_MESSAGE.MISSING_CONFIRMATIONCODE,
  },
};