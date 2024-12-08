// src/config/swagger.config.ts
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mountain Info API',
      version: '1.0.0',
      description: 'Provides weather, air quality, and sunrise/sunset times for mountain trails.',
    },
    components: {
      // OpenAPI 3.0에서 사용하는 securitySchemes
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // JWT 형식 명시
        },
      },
    },
    security: [
      {
        bearerAuth: [], // 모든 엔드포인트에 기본적으로 적용
      },
    ],
    servers: [
      {
        url: 'https://d3f5n2hgodyf83.cloudfront.net',
        description: 'Deployment Environment',
      },
      {
        url: 'http://localhost:8000',
        description: 'Local Development Server',
      },
    ],
  },
  apis: [path.resolve(__dirname, '../handlers/**/*.ts'), path.resolve(__dirname, '../modules/**/*.ts')], // 경로는 필요에 따라 수정
  parserOptions: {
    tsConfigFile: './tsconfig.json',
  },
};

export default swaggerOptions;
