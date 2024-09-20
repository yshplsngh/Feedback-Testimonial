import type { Express, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import config from '../utils/config.ts';
import './passportConfig.ts';

export default function authRoutes(app: Express): void {
  app.use(
    session({
      secret: config.USER_SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000 * 60 * 60,
      },
      //TODO: add Store
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
