import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 4000,

  NODE_ENV: process.env.NODE_ENV,

  REDIS_URL: process.env.REDIS_URL || 'redis://redis:6379',

  USER_SESSION_SECRET:
    process.env.USER_SESSION_SECRET ||
    'MicXqgdng5pXTHLvzHiYv8HssdivNNmgcwGcUVeEDEs=',

  CLIENT_ID: process.env.CLIENT_ID || '',

  CLIENT_SECRET: process.env.CLIENT_SECRET || '',

  DEV_GOOGLE_CALLBACK: 'http://localhost:4000/api/auth/google/redirect',

  PROD_GOOGLE_CALLBACK:
    'https://testimonialserver.yshplsngh.in/api/auth/google/redirect',
};
