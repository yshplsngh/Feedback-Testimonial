import prisma from '../database/index.ts';
import type { UserData } from './authTypes.ts';

export function findUserByGID({ gId }: { gId: string }) {
  return prisma.user.findUnique({
    where: { googleId: gId },
  });
}

export function createUser(userData: UserData) {
  return prisma.user.create({
    data: {
      googleId: userData.googleId,
      name: userData.name,
      email: userData.email,
      pictureUrl: userData.pictureUrl,
      authProvider: userData.authProvider,
    },
  });
}
