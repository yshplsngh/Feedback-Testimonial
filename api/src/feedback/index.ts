import { Express, Response, Request, NextFunction } from 'express';
import prisma from '../database';
import { createError } from '../utils/errorHandling.ts';
import { FeedbackSchema } from './types.ts';
import requireAuth from '../auth/requireAuth.ts';
import rateLimitMiddleware from '../utils/middlewares/requestLimiter.ts';

export default function (app: Express) {
  app.post(
    '/api/feedback/submitFeedback',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const parsedResult = FeedbackSchema.safeParse(req.body);
      if (!parsedResult.success) {
        next(parsedResult.error);
        return;
      }

      const spaceExist = await prisma.space.findUnique({
        where: {
          spaceName: parsedResult.data.spaceName,
        },
      });
      if (!spaceExist) {
        return next(new createError('Space does not exist', 404));
      }
      await prisma.feedback.create({
        data: {
          spaceId: spaceExist.id,
          name: parsedResult.data.name,
          email: parsedResult.data.email,
          stars: parsedResult.data.stars,
          customerFeedback: parsedResult.data.customerFeedback,
        },
      });
      return res.status(201).json({ success: true });
    },
  );

  //this will go in another backend
  app.get(
    '/api/feedback/getFeedbacks/:spaceName',
    rateLimitMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const spaceName = req.params.spaceName;
      if (!spaceName) {
        return next(new createError('spaceName is not defined in url', 402));
      }
      const spaceExist = await prisma.space.findUnique({
        where: {
          spaceName: spaceName,
        },
      });
      if (!spaceExist) {
        return res.status(200).send('oh no invalid url 🤦🏼‍♂️');
      }
      const feedbackData = await prisma.feedback.findMany({
        where: {
          spaceId: spaceExist.id,
        },
      });
      console.log(feedbackData);
      res.status(200).send(feedbackData);
    },
  );
}
