import type { Express, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import config from '../utils/config';
import RedisStore from 'connect-redis';
import { Redis } from '../Redis';
import { User } from '@prisma/client';

import './passportConfig';
import { createError } from '../utils/errorHandling';

export default function authRoutes(app: Express): void {
  app.use(
    session({
      secret: config.USER_SESSION_SECRET,
      store: new RedisStore({
        client: Redis.getInstance().getClient(),
        ttl: 60 * 60 * 24 * 7,
      }),
      resave: false,
      saveUninitialized: true,
      proxy: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  );

  app.get('/api/auth/google/redirect', (req: Request, res: Response, next) => {
    passport.authenticate('google', (err: unknown, user: User) => {
      if (err || !user) {
        const loginPageUrl = new URL(
          config.NODE_ENV === 'development'
            ? 'http://localhost:3000/login'
            : 'https://testimonial.yshplsngh.in/login',
        );
        loginPageUrl.searchParams.append('error', 'google auth failed');
        return res.redirect(loginPageUrl.toString());
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(new createError('Session error', 500));
        }
        const dashboardUrl =
          config.NODE_ENV === 'development'
            ? 'http://localhost:3000/dashboard'
            : 'https://testimonial.yshplsngh.in/dashboard';

        return res.redirect(dashboardUrl);
      });
    })(req, res, next);
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    req.logout((err) => {
      if (err) return res.sendStatus(400);

      req.session.destroy((err) => {
        if (err) return res.sendStatus(500);
        res.clearCookie('connect.sid');
        res.sendStatus(200);
      });
    });
  });
}
