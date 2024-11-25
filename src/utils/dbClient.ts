import mongoose from 'mongoose';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

let isConnected = false;

const downloadCertificate = async () => {
  const bucketName = process.env.S3_BUCKET_NAME!;
  const certificateKey = process.env.S3_CERTIFICATE_PATH!;
  const localPath = path.resolve('/tmp/global-bundle.pem');

  if (fs.existsSync(localPath)) {
    console.log('Certificate already exists locally');
    return localPath;
  }

  console.log('Downloading certificate from S3...');
  const s3 = new AWS.S3();

  const params = {
    Bucket: bucketName,
    Key: certificateKey,
  };

  const fileStream = fs.createWriteStream(localPath);
  const s3Object = s3.getObject(params).createReadStream();

  return new Promise<string>((resolve, reject) => {
    s3Object
      .pipe(fileStream)
      .on('finish', () => {
        console.log('Certificate downloaded successfully');
        resolve(localPath);
      })
      .on('error', (error) => {
        console.error('Error downloading certificate:', error);
        reject(error);
      });
  });
};

const connectDB = async () => {
  console.log('connectDB() called');

  if (isConnected) {
    console.log('Reusing existing database connection');
    return;
  }

  try {
    console.log('Attempting to connect to DocumentDB...');

    // 필수 환경 변수 확인
    const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
    if (!DB_USER || !DB_PASS || !DB_HOST || !DB_PORT || !DB_NAME) {
      throw new Error('Missing required environment variables for DocumentDB connection');
    }

    // 인증서 다운로드
    const certificatePath = await downloadCertificate();

    // MongoDB URI 생성
    const uri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?tls=true&tlsCAFile=${certificatePath}&retryWrites=false`;
    console.log(`Using URI: ${uri}`);

    // MongoDB 연결
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to DocumentDB');
  } catch (error) {
    console.error('Error connecting to DocumentDB:', error);
    throw error;
  }
};

export default connectDB;
