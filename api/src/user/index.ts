import { Express, type Request, type Response } from 'express';

export default function userRoutes(app: Express) {
  app.get('/api/user', (req: Request, res: Response) => {
    res.cookie('testing', 'testing', {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Required for HTTPS
      sameSite: 'strict', // Protects against CSRF
      maxAge: 24 * 60 * 60 * 1000, // Optional: cookie expiration (24 hours in this example)
      path: '/', // Cookie path
    });
    return res.status(200).json(req.user || { message: 'yeah no login user' });
  });
}
