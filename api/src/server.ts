import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandling, handleError } from './utils/errorHandling';

// routes import
import authRoutes from './auth';
import userRoutes from './user';
import spaceRoutes from './space';
import feedbackRoutes from './feedback';
import embedFeedbacks from './embedFeedbacks';

export const createServer = (): Express => {
  const app: Express = express();
  app.set('trust proxy', 1);
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: [
        'https://testimonial.yshplsngh.in',
        'https://feedback-testimonial.vercel.app',
      ],
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

  app.all('/', (_req: Request, res: Response) => {
    return res.status(200).json({
      Status: 'OK',
      RunTime: process.uptime(),
    });
  });

  // require('./auth').default(app);
  authRoutes(app);
  userRoutes(app);
  spaceRoutes(app);
  feedbackRoutes(app);
  embedFeedbacks(app);

  app.use(errorHandling);
  return app;
};
