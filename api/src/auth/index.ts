import type { Express, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import config from '../utils/config.ts';
import './passportConfig.ts';

export const memoryStore = new session.MemoryStore();

export default function authRoutes(app: Express): void {
  app.use(
    session({
      secret: config.USER_SESSION_SECRET,
      name: 'sid',
      store: memoryStore,
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
       * coz on visit landing page session is created and check user is logged in not.
       */
      saveUninitialized: false,
      cookie: {
        // when true cookie set over a secure channel like HTTPS only.
        // when auto cookie set over an HTTP also.
        // secure: config.NODE_ENV === 'production' ? true : "auto",
        // when true, cookie can't be accessed through client-side JavaScript.
        // httpOnly: true,
        // sameSite: config.NODE_ENV === 'production' ? "none": "lax",
        maxAge: 60000 * 60 * 60,
      },
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

  app.get(
    '/api/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (_req: Request, res: Response) => {
      res.status(200);
      res.redirect(config.WEB_LOGIN_REDIRECT_URL);
    },
  );

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    console.log(req.user);
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
