import { Express, NextFunction, Response, Request } from 'express';
import {
  BNewSpacesType,
  EditedSpaceWithIdSchema,
  NewSpaceScheme,
} from './types';
import prisma from '../database';
import { createError } from '../utils/errorHandling';
import requireAuth from '../utils/middlewares/requireAuth';
import rateLimitMiddleware from '../utils/middlewares/requestLimiter';
import { Redis } from '../Redis';

export default function (app: Express) {
  app.get(
    '/api/space/getUserSpaces',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response) => {
      const spacesWithCount = await prisma.space.findMany({
        where: {
          userId: req.user!.id,
        },
        select: {
          id: true,
          userId: true,
          spaceName: true,
          websiteUrl: true,
          customMessage: true,
          question: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              Feedback: true,
            },
          },
        },
      });
      /**
       * replace a _count object with feedbackCount variable
       * @return BNewSpacesType[]
       */
      const spacesWithFeedbackCount: BNewSpacesType[] = spacesWithCount.map(
        ({ _count, ...space }) => ({
          ...space,
          feedbackCount: _count.Feedback,
        }),
      );

      return res.status(201).json(spacesWithFeedbackCount);
    },
  );

  app.get(
    '/api/space/getUserSpace/:spaceName',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user!.id;
      const receivedSpaceName = req.params.spaceName?.toLowerCase();
      if (!receivedSpaceName) {
        return next(new createError('SpaceName is not defined in url', 406));
      }

      const spaceExist = await prisma.space.findUnique({
        where: {
          spaceName: receivedSpaceName,
          userId: userId,
        },
        select: {
          id: true,
          userId: true,
          spaceName: true,
          websiteUrl: true,
          customMessage: true,
          question: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              Feedback: true,
            },
          },
        },
      });
      if (!spaceExist) {
        return next(new createError('space not exist', 409));
      }

      /**
       * replace a _count object with feedbackCount variable
       * @return BNewSpacesType
       */
      const { _count, ...remainingSpace } = spaceExist;
      const spaceWithFeedbackCount: BNewSpacesType = {
        ...remainingSpace,
        feedbackCount: _count.Feedback,
      };

      return res.status(200).json(spaceWithFeedbackCount);
    },
  );

  /**
   * using it in Feedback Form
   * @return question, customMessage
   */
  app.get(
    '/api/space/spaceInfo/:spaceName',
    rateLimitMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const receivedSpaceName = req.params.spaceName?.toLowerCase();
      if (!receivedSpaceName) {
        return next(new createError('SpaceName is not defined in url', 406));
      }
      const cachedSpaceData =
        await Redis.getInstance().getSpaceFormInfo(receivedSpaceName);
      if (cachedSpaceData) {
        return res.status(200).json(cachedSpaceData);
      }
      const spaceData = await prisma.space.findUnique({
        where: {
          spaceName: receivedSpaceName,
        },
        select: {
          question: true,
          customMessage: true,
        },
      });
      if (!spaceData) {
        return next(new createError('space not exist', 404));
      }
      await Redis.getInstance().setSpaceFormInfo({
        spaceName: receivedSpaceName,
        spaceData,
      });
      return res.status(200).json(spaceData);
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

  app.put(
    '/api/space/edit',
    rateLimitMiddleware,
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const parsedResult = EditedSpaceWithIdSchema.safeParse(req.body);
      if (!parsedResult.success) {
        next(parsedResult.error);
        return;
      }
      const spaceIdExist = await prisma.space.findUnique({
        where: {
          id: parsedResult.data.id,
        },
      });
      if (!spaceIdExist) {
        return next(new createError('space not exist', 409));
      }

      if (spaceIdExist.spaceName !== parsedResult.data.spaceName) {
        const spaceExist = await prisma.space.findUnique({
          where: {
            spaceName: parsedResult.data.spaceName,
          },
        });
        if (spaceExist) {
          return next(new createError('Space Name already occupied', 409));
        }
      }

      const updatedSpace = await prisma.space.update({
        where: {
          id: spaceIdExist.id,
        },
        data: {
          spaceName: parsedResult.data.spaceName,
          question: parsedResult.data.question,
          customMessage: parsedResult.data.customMessage,
          websiteUrl: parsedResult.data.websiteUrl,
        },
      });

      return res.status(200).json(updatedSpace);
    },
  );

  app.delete(
    '/api/space/delete/:spaceId',
    async (req: Request, res: Response, next: NextFunction) => {
      const receivedSpaceId = req.params.spaceId;
      if (!receivedSpaceId) {
        return next(new createError('SpaceName is not defined in url', 406));
      }
      const spaceExist = await prisma.space.findUnique({
        where: {
          id: +receivedSpaceId,
        },
      });
      if (!spaceExist) {
        return next(new createError('space not exist', 404));
      }

      await prisma.$transaction(async (prisma) => {
        await prisma.feedback.deleteMany({ where: { spaceId: spaceExist.id } });
        await prisma.space.delete({ where: { id: spaceExist.id } });
      });

      return res.status(200).json({ success: true });
    },
  );
}
