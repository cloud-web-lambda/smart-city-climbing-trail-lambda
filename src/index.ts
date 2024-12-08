// src/index.ts
// import 'ts-node/register';
import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerSpec from '../swagger.json'; // swagger.json 파일을 import

const app: Application = express();
app.use(express.json());

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://cloud-web-s3.s3-website.ap-northeast-2.amazonaws.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

app.get('/swagger.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
