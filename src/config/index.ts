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
};
