import { HttpException } from '@/common/vo/http-exception.vo';
import { BaseErrorCode } from '@/common/@types/common';

export class WeatherException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.status, error.message);
    Object.setPrototypeOf(this, WeatherException.prototype); // TypeScript에서 Error 상속 시 필요
  }
}
