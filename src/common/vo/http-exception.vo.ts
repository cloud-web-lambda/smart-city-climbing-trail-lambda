import { StatusCode } from '../@types/common';

export class HttpException {
  readonly status: StatusCode;
  readonly message: string;

  constructor(status: StatusCode, message: string) {
    this.status = status;
    this.message = message;
  }
}
