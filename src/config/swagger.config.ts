import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mountain Info API',
      version: '1.0.0',
      description: 'Provides weather, air quality, and sunrise/sunset times for mountain trails.',
    },
    servers: [
      {
        url: 'https://ek8c3h52ac.execute-api.ap-northeast-2.amazonaws.com/dev',
        description: 'Development Environment',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/handlers/**/*.ts', './src/handlers/auth.ts'], // 경로는 필요에 따라 수정
};

export default swaggerOptions;
