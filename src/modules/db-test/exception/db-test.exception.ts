import type { BaseErrorCode } from '@/common/@types/common';
import { HttpException } from '@/common/vo/http-exception.vo';

export class DBTestException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.status, error.message);
  }
}
