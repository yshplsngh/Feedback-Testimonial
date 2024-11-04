import type { Express, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import config from '../utils/config';
import rateLimitMiddleware from '../utils/middlewares/requestLimiter';
import RedisStore from 'connect-redis';
import { Redis } from '../Redis';
import { User } from '@prisma/client';

import './passportConfig';
import { createError } from '../utils/errorHandling';

export default function authRoutes(app: Express): void {
  app.use(
    session({
      secret: config.USER_SESSION_SECRET,
      name: 'sid',
      store: new RedisStore({
        client: Redis.getInstance().getClient(),
        prefix: 'session:',
        ttl: 60 * 60 * 24 * 7,
      }),
      /**
       * when true: the session data is saved back to the session store on every request made,
       * regardless of whether there was any modification to the session data during the request.
       * when false: the session data is only saved back to the session store
       * if something within the session data was actually modified during the request
       */
      resave: false,
      /**
       * when false: express-session store sessions in sessionStore only if we modified req.session object.
       * when true: express-session store sessions sessionStore even user just visit landing page.
       * coz on visit landing page session is created, and check user is logged in or not.
       */
      saveUninitialized: false,
      cookie: {
        /**
         * when true: cookie set over a secure channel like HTTPS only.
         * when auto: cookie set over an HTTP also.
         */
        secure: 'auto',
        /** when true, cookie can't be accessed through client-side JavaScript.*/
        httpOnly: true,
        sameSite: config.NODE_ENV === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    '/api/auth/google',
    rateLimitMiddleware,
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  );

  app.get(
    '/api/auth/google/redirect',
    rateLimitMiddleware,
    (req: Request, res: Response, next) => {
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
    },
  );

  app.post(
    '/api/auth/logout',
    rateLimitMiddleware,
    (req: Request, res: Response) => {
      if (!req.user) return res.sendStatus(401);

      req.logout((err) => {
        if (err) return res.sendStatus(400);

        req.session.destroy((err) => {
          if (err) return res.sendStatus(500);
          res.clearCookie('connect.sid');
          res.sendStatus(200);
        });
      });
    },
  );
}
