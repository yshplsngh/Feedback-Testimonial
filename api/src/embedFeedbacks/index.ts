import { Express, NextFunction, Request, Response } from 'express';
import { createError } from '../utils/errorHandling';
import prisma from '../database';
import wrapHtml from './wrapHtml';

interface queryParams {
  theme?: string;
  speed?: string;
}

export default function embedFeedbacks(app: Express) {
  app.get(
    '/api/:spaceName',
    async (req: Request, res: Response, next: NextFunction) => {
      const spaceName = req.params.spaceName?.toLowerCase();
      const { theme, speed } = req.query as queryParams;

      if (!spaceName) {
        return next(new createError('invalid url', 400));
      }
      const spaceExist = await prisma.space.findUnique({
        where: {
          spaceName: spaceName,
        },
      });
      if (!spaceExist) {
        return next(new createError('oh no invalid Url', 404));
      }

      const feedbacks = await prisma.feedback.findMany({
        where: {
          spaceId: spaceExist.id,
          favorite: true,
        },
        select: {
          id: true,
          name: true,
          stars: true,
          customerFeedback: true,
          createdAt: true,
        },
      });
      if (feedbacks.length === 0) {
        return next(
          new createError('please add some feedback into favorite', 200),
        );
      }
      const feedbackWidget = wrapHtml({ feedbacks, theme, speed });
      return res.status(200).send(feedbackWidget);
    },
  );
}
