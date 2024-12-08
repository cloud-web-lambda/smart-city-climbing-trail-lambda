// generate-swagger.ts
import fs from 'fs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

// TypeScript 파일에서 Swagger 옵션을 가져옵니다.
import swaggerOptions from './src/config/swagger.config';

// Swagger 사양을 생성합니다.
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// 사양을 파일로 저장합니다.
fs.writeFileSync(path.resolve(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2));

console.log('Swagger 사양이 성공적으로 생성되었습니다.');
