import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './auth/index.ts';
import userRoutes from './user/index.ts';
import spaceRoutes from './space/index.ts';
import feedbackRoutes from './feedback/index.ts';

import { errorHandling, handleError } from './utils/errorHandling.ts';
import cookieParser from 'cookie-parser';

export const createServer = (): Express => {
  const app: Express = express();
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  // app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  );

  const uncaughtError = (error: unknown) => {
    handleError({ _error: error, uncaught: true });
    process.exit(1);
  };

  process.on('unhandledRejection', uncaughtError);
  process.on('uncaughtException', uncaughtError);

  app.all('/ping', (req: Request, res: Response) => {
    res.status(200).json({
      RunTime: process.uptime(),
    });
  });

  // require('./auth').default(app);
  authRoutes(app);
  userRoutes(app);
  spaceRoutes(app);
  feedbackRoutes(app);

  app.use(errorHandling);
  return app;
};
