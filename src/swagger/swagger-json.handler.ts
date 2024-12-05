// src/swagger/swagger-json.handler.ts
import createServer from '@codegenie/serverless-express';
import app from '@/index'; // src/index.ts에서 Express 앱 가져오기

export const handler = createServer({ app });
