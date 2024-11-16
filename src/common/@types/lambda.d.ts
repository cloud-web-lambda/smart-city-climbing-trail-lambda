import { APIGatewayEvent, Handler } from 'aws-lambda';
import type { Request, Response } from './common';

export type BaseHandler<ResponseBody> = (
  req: Request,
  res: Response<ResponseBody>
) => Response<ResponseBody> | Promise<Response<ResponseBody>>;

export type AWSHandler = Handler<APIGatewayEvent>;
export type AWSHandlerEvent = Parameters<AWSHandler>[0];
export type AWSHandlerContext = Parameters<AWSHandler>[1];
export type AWSHandlerCallback = Parameters<AWSHandler>[2];

export type CreateGatewayHandler<ResponseBody> = (handler: BaseHandler<ResponseBody>) => AWSHandler;
