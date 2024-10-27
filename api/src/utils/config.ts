import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 4001,

  NODE_ENV: process.env.NODE_ENV,

  USER_SESSION_SECRET:
    process.env.USER_SESSION_SECRET ||
    'MicXqgdng5pXTHLvzHiYv8HssdivNNmgcwGcUVeEDEs=',

  CLIENT_ID: process.env.CLIENT_ID || 'HERE_GOES_YOUR_GOOGLE_CLIENT_ID',

  CLIENT_SECRET:
    process.env.CLIENT_SECRET || 'HERE_GOES_YOUR_GOOGLE_CLIENT_SECRET',

  GOOGLE_CALLBACK: 'http://localhost:4000/api/auth/google/redirect',
};
