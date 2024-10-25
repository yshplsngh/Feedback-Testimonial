import { Express, Response, Request, NextFunction } from 'express';
import prisma from '../database';
import { createError } from '../utils/errorHandling.ts';
import { FeedbackSchema } from './types.ts';
import rateLimitMiddleware from '../utils/middlewares/requestLimiter.ts';
import requireAuth from '../utils/middlewares/requireAuth.ts';

export default function (app: Express) {
  //collect feedback from public facing endpoint, so no authorisation
  app.post(
    '/api/feedback/submitFeedback',
    rateLimitMiddleware,
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

  app.get(
    '/api/feedback/getFeedbacks/:spaceName',
    requireAuth,
    rateLimitMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const spaceName = req.params.spaceName;
      if (!spaceName) {
        return next(new createError('spaceName is not defined in url', 406));
      }
      const spaceExist = await prisma.space.findUnique({
        where: {
          spaceName: spaceName,
          userId: req.user!.id,
        },
      });
      if (!spaceExist) {
        return next(new createError('Space does not exist', 404));
      }
      const feedbackData = await prisma.feedback.findMany({
        where: {
          spaceId: spaceExist.id,
        },
      });
      return res.status(200).send(feedbackData);
    },
  );

  app.post(
    '/api/feedback/setFavoriteFeedback/:feedbackId',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const feedbackId = req.params.feedbackId;
      if (!feedbackId) {
        return next(new createError('Feedback Id is not defined in url', 406));
      }
      const feedbackExist = await prisma.feedback.findUnique({
        where: {
          id: +feedbackId,
        },
      });
      if (!feedbackExist) {
        return next(new createError('Feedback does not exist', 404));
      }
      const updatedFeedback = await prisma.feedback.update({
        where: {
          id: +feedbackId,
        },
        data: {
          favorite: !feedbackExist.favorite,
        },
      });
      return res.status(200).json(updatedFeedback);
    },
  );
}
