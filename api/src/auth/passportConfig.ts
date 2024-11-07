import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../utils/config';
import { User } from '@prisma/client';
import prisma from '../database';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL:
        config.NODE_ENV === 'development'
          ? config.DEV_GOOGLE_CALLBACK
          : config.PROD_GOOGLE_CALLBACK,
      // callbackURL: config.PROD_GOOGLE_CALLBACK,
      scope: ['profile'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const userExist: User | null = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });
        if (profile.emails === undefined || profile.emails[0] === undefined) {
          return done(null, false);
        }
        if (userExist) {
          return done(null, userExist);
        } else {
          const user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: profile.displayName,
              userName: profile.emails[0].value.split('@')[0] as string,
              email: profile.emails[0].value,
              pictureUrl: profile.photos
                ? profile.photos[0]
                  ? profile.photos[0].value
                  : null
                : null,
              authProvider: profile.provider,
            },
          });
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done): void => {
  done(null, user.googleId);
});

passport.deserializeUser(async (GID: string, done) => {
  try {
    const userExist: User | null = await prisma.user.findUnique({
      where: { googleId: GID },
    });
    if (!userExist) {
      return done(null, false);
    }
    return done(null, userExist);
  } catch (error) {
    done(error);
  }
});
