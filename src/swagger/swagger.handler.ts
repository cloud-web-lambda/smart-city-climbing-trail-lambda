import createServer from '@codegenie/serverless-express';
import app from '@/index'; // Express 앱 불러오기

export const handler = createServer({ app });
