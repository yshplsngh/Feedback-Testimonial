import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandling, handleError } from './utils/errorHandling.ts';

// routes imports
import authRoutes, { memoryStore } from './auth';
import userRoutes from './user';
import spaceRoutes from './space';
import feedbackRoutes from './feedback';
import warehouseRoutes from './warehouse';

export const createServer = (): Express => {
  const app: Express = express();
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  );

  // to delay server request
  app.use(async (_req: Request, _res: Response, next: NextFunction) => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(0);
    next();
  });

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

  app.use(async (_req: Request, _res: Response, next: NextFunction) => {
    console.log(memoryStore);
    next();
  });

  userRoutes(app);
  spaceRoutes(app);
  feedbackRoutes(app);
  warehouseRoutes(app);

  app.use(errorHandling);
  return app;
};
