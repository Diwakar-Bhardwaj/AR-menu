import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ar-menu',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  LIBRETRANSLATE_URL: process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

