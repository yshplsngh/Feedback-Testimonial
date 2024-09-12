import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../utils/config.ts';
import { createUser, findUserByGID } from './users.ts';
import { User } from '@prisma/client';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK,
      scope: ['profile'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const userExist: User | null = await findUserByGID({ gId: profile.id });
        if (profile.emails === undefined || profile.emails[0] === undefined) {
          return done(null, false);
        }
        if (userExist) {
          return done(null, userExist);
        } else {
          const user = await createUser({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            pictureUrl: profile.photos
              ? profile.photos[0]
                ? profile.photos[0].value
                : null
              : null,
            authProvider: profile.provider,
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
  // @ts-expect-error User type from Express doesn't include googleId
  done(null, user.googleId);
});

passport.deserializeUser(async (GID: string, done) => {
  try {
    const userExist: User | null = await findUserByGID({ gId: GID });
    if (!userExist) {
      return done(null, null);
    }
    return done(null, userExist);
  } catch (error) {
    done(error);
  }
});
