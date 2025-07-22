const dotenv = require('dotenv');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'dev';
dotenv.config({
  path: path.resolve(
    __dirname,
    '..',
    '..',
    `.env.${nodeEnv === 'dev' ? 'dev' : nodeEnv}`,
  ),
});

const config = {
  env: nodeEnv,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  port: process.env.PORT || 3000,

  database: {
    postgres: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      connectionString: process.env.CONNECTION_STRING,
    },
    mongodb: {
      uri: process.env.MONGO_URI,
    },
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET,
    apiKey: process.env.API_KEY,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = config;
