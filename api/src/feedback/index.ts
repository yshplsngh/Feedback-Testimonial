import { Express, Response, Request, NextFunction } from 'express';
import prisma from '../database';
import { createError } from '../utils/errorHandling.ts';
import { FeedbackSchema } from './types.ts';

export default function (app: Express) {
  app.get(
    '/api/feedback/formInfo/:spaceName',
    async (req: Request, res: Response, next: NextFunction) => {
      const receivedSpaceName = req.params.spaceName;
      const data = await prisma.space.findUnique({
        where: {
          spaceName: receivedSpaceName,
        },
        select: {
          question: true,
          customMessage: true,
        },
      });
      if (!data) {
        return next(new createError('Space does not exist', 404));
      }
      res.status(200).json(data);
    },
  );

  app.post(
    '/api/feedback/sendFeedback',
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
}
