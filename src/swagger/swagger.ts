import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '@/config/swagger.config';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import { getAbsoluteFSPath } from 'swagger-ui-dist'; // ESM 스타일로 가져오기

// Swagger UI 정적 리소스 패키지
const swaggerUiPath = getAbsoluteFSPath();

export const setupSwagger = (app: Application): void => {
  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Swagger JSON 데이터 제공
  app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Swagger UI 초기화 스크립트 제공
  app.get('/swagger-ui/swagger-initializer.js', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`
      window.onload = function() {
        window.ui = SwaggerUIBundle({
          url: "/swagger.json", // Swagger JSON 경로 설정
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout"
        });
      };
    `);
  });

  // Swagger UI HTML 파일 제공
  app.get('/swagger-ui', (req: Request, res: Response) => {
    res.sendFile(path.join(swaggerUiPath, 'index.html')); // index.html만 반환
  });

  // Swagger UI 정적 리소스 제공
  app.use('/swagger-ui', express.static(swaggerUiPath));
};
