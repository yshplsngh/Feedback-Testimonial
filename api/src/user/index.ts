import { Express, type Request, type Response } from 'express';

export default function userRoutes(app: Express) {
  app.get('/api/user', (req: Request, res: Response) => {
    res.cookie('testing', 'testing', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(req.user || { message: 'yeah no login user' });
  });
}
