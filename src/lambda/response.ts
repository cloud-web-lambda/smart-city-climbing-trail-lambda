import type { ResponseType } from '@/common/@types/common';
import type { APIGatewayProxyCallbackV2 } from 'aws-lambda';

export const getResponse = <ResponseBody>({ status, body, headers }: ResponseType<ResponseBody>) => {
  let responseBody = '';

  if (typeof body === 'object') {
    responseBody = JSON.stringify(body);
  }
  if (typeof body === 'string') {
    responseBody = body;
  }

  return {
    statusCode: status,
    body: responseBody,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      ...headers,
    },
  };
};

export const redirectResponse = (callback: APIGatewayProxyCallbackV2, url: string) => {
  const response = {
    statusCode: 302,
    headers: {
      Location: url,
    },
  };
  callback(null, response);
};
