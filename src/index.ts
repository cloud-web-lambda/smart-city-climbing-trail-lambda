import express from 'express';
import { setupSwagger } from './swagger/swagger';

const app = express();
app.use(express.json());

// Swagger 설정
setupSwagger(app);

export default app;
