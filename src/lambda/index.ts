import type { Request } from '@/common/@types/common';
import type { AWSHandlerCallback, AWSHandlerContext, AWSHandlerEvent, BaseHandler } from '@/common/@types/lambda';
import { parseBody } from '@/utils/json';
import { getResponse } from './response';

import { HttpStatus } from '@/common/constants/http-status';
import { HttpException } from '@/common/vo/http-exception.vo';

export const createGatewayHandler = <ResponseBody>(handler: BaseHandler<ResponseBody>) => {
  return async (event: AWSHandlerEvent, _: AWSHandlerContext, callback: AWSHandlerCallback) => {
    const { body: rawBody, headers, pathParameters, queryStringParameters } = event;
    const body = parseBody(rawBody);

    const req = {
      params: pathParameters,
      query: queryStringParameters,
      body,
      headers,
      event,
      callback,
    } satisfies Request;
    const res = getResponse;

    try {
      const response = await handler(req, res);
      return response;
    } catch (err) {
      if (err instanceof HttpException) {
        const { status, message } = err;
        return getResponse({ status, body: { status, message } });
      }

      return getResponse({
        status: err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        body: err?.message || 'INTERNAL SERVER ERROR',
      });
    }
  };
};
