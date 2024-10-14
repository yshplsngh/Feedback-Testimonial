import { Express, NextFunction, Response, Request } from 'express';
import { NewSpaceScheme } from './types.ts';
import prisma from '../database';
import { createError } from '../utils/errorHandling.ts';
import requireAuth from '../utils/middlewares/requireAuth.ts';
import rateLimitMiddleware from '../utils/middlewares/requestLimiter.ts';

export default function (app: Express) {
  app.get(
    '/api/space/getUserSpaces',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response) => {
      const spaces = await prisma.space.findMany({
        where: {
          userId: req.user!.id,
        },
      });
      const spaceWithFeedbackCount = await Promise.all(
        spaces.map(async (space) => {
          const feedbackCount = await prisma.feedback.count({
            where: {
              spaceId: space.id,
            },
          });
          return { ...space, feedbackCount };
        }),
      );
      return res.status(201).json(spaceWithFeedbackCount);
    },
  );

  // using in public facing endpoint, so no protection
  app.get(
    '/api/space/spaceInfo/:spaceName',
    rateLimitMiddleware,
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
      return res.status(200).json(data);
    },
  );

  app.post(
    '/api/space/new',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const parsedResult = NewSpaceScheme.safeParse(req.body);
      if (!parsedResult.success) {
        next(parsedResult.error);
        return;
      }
      const spaceExist = await prisma.space.findUnique({
        where: {
          spaceName: parsedResult.data.spaceName,
        },
      });
      if (spaceExist) {
        return next(new createError('Space Name already exist', 409));
      }
      await prisma.space.create({
        data: {
          userId: req.user!.id,
          spaceName: parsedResult.data.spaceName,
          websiteUrl: parsedResult.data.websiteUrl,
          customMessage: parsedResult.data.customMessage,
          question: parsedResult.data.question,
        },
      });
      return res.status(201).json({ success: true });
    },
  );
}
