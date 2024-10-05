import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV, USER_SESSION_SECRET, CLIENT_SECRET, CLIENT_ID } =
  process.env;

export default {
  PORT: PORT || 4001,
  NODE_ENV: NODE_ENV || 'development',
  USER_SESSION_SECRET:
    USER_SESSION_SECRET || 'MicXqgdng5pXTHLvzHiYv8HssdivNNmgcwGcUVeEDEs=',
  CLIENT_ID: CLIENT_ID || 'HERE_GOES_YOUR_GOOGLE_CLIENT_ID',
  CLIENT_SECRET: CLIENT_SECRET || 'HERE_GOES_YOUR_GOOGLE_CLIENT_SECRET',
  GOOGLE_CALLBACK: 'http://localhost:4000/api/auth/google/redirect',
  WEB_LOGIN_REDIRECT_URL: 'http://localhost:3000',
};
