import { Express, NextFunction, Response, Request } from 'express';
import requireAuth from '../auth/requireAuth.ts';
import { NewSpaceScheme } from './types.ts';
import prisma from '../database';

export default function (app: Express) {
  app.post(
    '/api/spaces/new',
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsedResult = NewSpaceScheme.safeParse(req.body);
        if (!parsedResult.success) {
          next(parsedResult.error);
          return;
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
        return res.status(200).json({ success: true });
      } catch (error) {
        next(error);
      }
    },
  );
}
