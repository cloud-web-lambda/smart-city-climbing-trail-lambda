import dotenv from 'dotenv';

dotenv.config();

export default {
  // DATA PORTAL
  DATA_PORTAL_API_URL: process.env.DATA_PORTAL_API_URL as string,
  DATA_PORTAL_API_KEY: process.env.DATA_PORTAL_API_KEY as string,
  // VWORLD
  VWORLD_API_URL: process.env.VWORLD_API_URL as string,
  VWORLD_API_KEY: process.env.VWORLD_API_KEY as string,
  // GOOGLE
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY as string,
  GOOGLE_MAPS_API_URL: process.env.GOOGLE_MAPS_API_URL as string,
  // TEST
  TEST_API_URL: process.env.TEST_API_URL as string,
  // DOCUMENTDB
  DB_HOST: process.env.DB_HOST as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASS: process.env.DB_PASS as string,
  DB_NAME: process.env.DB_NAME as string,
  // S3
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME as string,
  S3_CERTIFICATE_PATH: process.env.S3_CERTIFICATE_PATH as string,
};
