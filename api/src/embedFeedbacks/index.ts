import { Express, NextFunction, Request, Response } from 'express';
import { createError } from '../utils/errorHandling.ts';
import prisma from '../database';
import wrapHtml from './wrapHtml.ts';

interface queryParams {
  theme?: string;
  speed?: string;
}

export default function embedFeedbacks(app: Express) {
  app.get(
    '/api/:spaceName',
    async (req: Request, res: Response, next: NextFunction) => {
      const spaceName = req.params.spaceName;
      const { theme, speed } = req.query as queryParams;

      if (!spaceName) {
        return next(new createError('invalid url', 400));
      }
      const feedbacks = await prisma.feedback.findMany({
        where: {
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

      const feedbackWidget = wrapHtml({ feedbacks, theme, speed });
      return res.status(200).send(feedbackWidget);
    },
  );
}
