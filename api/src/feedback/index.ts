import { Express, Response, Request, NextFunction } from 'express';
import prisma from '../database';
import { createError } from '../utils/errorHandling.ts';

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
}
