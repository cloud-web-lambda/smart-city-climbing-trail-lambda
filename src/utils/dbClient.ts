import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  console.log('connectDB() called');

  if (isConnected) {
    console.log('Reusing existing database connection');
    return;
  }

  try {
    console.log('Attempting to connect to DocumentDB...');
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
    console.log(`Using URI: ${uri}`);
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to DocumentDB');
  } catch (error) {
    console.error('Error connecting to DocumentDB:', error);
    throw error;
  }
};

export default connectDB;
