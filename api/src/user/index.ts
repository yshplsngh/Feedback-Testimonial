import { Express, type Request, type Response } from 'express';

export default function userRoutes(app: Express) {
  app.get('/api/user', (req: Request, res: Response) => {
    res.status(200).json(req.user || { message: 'yeah no login user' });
  });
}
