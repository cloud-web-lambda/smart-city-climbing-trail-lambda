import type {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';

import { HttpException } from '@/common/vo/http-exception.vo';
import { HttpStatus, HTTPStatus } from '@/common/constants/http-status';

export interface Request {
  headers?: APIGatewayProxyEventHeaders | null;
  params?: APIGatewayProxyEventPathParameters | null;
  query?: APIGatewayProxyEventQueryStringParameters | null;
  body?: string | object | null;
  event: APIGatewayEvent;
  callback: APIGatewayProxyCallback;
}

export interface ResponseType<ResponseBody> {
  status: number;
  body: ResponseBody;
  headers?: Record<string, string>;
}

export interface HandlerResponseToAWSLambda<T> {
  statusCode: number;
  body: T;
  headers: Record<string, string>;
}

export type Response<ResponseBody> = (props: ResponseType<ResponseBody>) => HandlerResponseToAWSLambda;

export type BaseErrorCode = HttpException;

export type ErrorCodeMapper<T> = {
  [K in keyof T]: BaseErrorCode;
};

export type StatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];
