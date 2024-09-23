import { Express, NextFunction, Response, Request } from 'express';
import { NewSpaceScheme } from './types.ts';
import prisma from '../database';
import { createError } from '../utils/errorHandling.ts';
import requireAuth from '../auth/requireAuth.ts';

export default function (app: Express) {
  app.get(
    '/api/space/getUserSpaces',
    requireAuth,
    async (req: Request, res: Response) => {
      const spaces = await prisma.space.findMany({
        where: {
          userId: req.user!.id,
        },
      });
      return res.status(201).json(spaces);
    },
  );

  app.post(
    '/api/space/new',
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
          headerTitle: parsedResult.data.headerTitle,
          customMessage: parsedResult.data.customMessage,
          question: parsedResult.data.question,
        },
      });
      return res.status(201).json({ success: true });
    },
  );
}
