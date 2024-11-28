import express from 'express';
import { setupSwagger } from './swagger/swagger';

const app = express();
app.use(express.json());

// 요청 로깅 추가
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

// Swagger 설정
setupSwagger(app);

export default app;
