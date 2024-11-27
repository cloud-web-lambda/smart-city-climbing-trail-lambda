import { HttpException } from '@/common/vo/http-exception.vo';
import { BaseErrorCode } from '@/common/@types/common';

export class AirQualityException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.status, error.message);
  }
}
