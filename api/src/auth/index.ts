import type { Express, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import config from '../utils/config';
import { User } from '@prisma/client';

import './passportConfig';
import { createError } from '../utils/errorHandling';

export default function authRoutes(app: Express): void {
  app.use(
    session({
      secret: config.USER_SESSION_SECRET,
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
            ? `${config.DEV_WEB_URL}/login`
            : `${config.PROD_WEB_URL}/login`,
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
            ? `${config.DEV_WEB_URL}/dashboard`
            : `${config.PROD_WEB_URL}/dashboard`;

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
