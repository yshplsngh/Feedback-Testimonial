import { Express, NextFunction, Request, Response } from 'express';
import { createError } from '../utils/errorHandling.ts';
import prisma from '../database';
import wrapHtml from './wrapHtml.ts';

interface queryParams {
  theme?: string;
}

export default function embedFeedbacks(app: Express) {
  app.get(
    '/api/feedbacks/:spaceName',
    async (req: Request, res: Response, next: NextFunction) => {
      const spaceName = req.params.spaceName;
      let { theme } = req.query as queryParams;
      // if the theme is undefined or null, then set dark
      theme = theme ?? 'dark';
      // if the theme is neither dark nor light set dark
      theme = theme !== 'dark' && theme !== 'light' ? 'dark' : theme;

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

      const feedbackWidget = wrapHtml({ feedbacks, theme });
      return res.status(200).send(feedbackWidget);
    },
  );
}
