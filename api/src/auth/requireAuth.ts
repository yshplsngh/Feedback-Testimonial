import type { NextFunction, Response, Request } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
  res.status(401);
  return res.json({ error: 'Unauthorized', message: 'Unauthorized' });
};
