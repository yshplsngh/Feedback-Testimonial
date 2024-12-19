import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: 4000,

  USER_SESSION_SECRET: 'MicXqgdng5pXTHLvzHiYv8HssdivNNmgcwGcUVeEDEs=',
  CLIENT_ID: process.env.CLIENT_ID || '',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '',

  DEV_GOOGLE_CALLBACK: 'http://localhost:4000/api/auth/google/redirect',
  PROD_GOOGLE_CALLBACK:
    'https://testimonialserver.yshplsngh.in/api/auth/google/redirect',

  DEV_WEB_URL: 'http://localhost:3000',
  PROD_WEB_URL: 'https://testimonial.yshplsngh.in',
};
