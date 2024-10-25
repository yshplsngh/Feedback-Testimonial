import type { NextFunction, Response, Request } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user && req.user.id) {
    return next();
  }
  return res
    .status(401)
    .json({ error: 'Unauthorized', message: 'Unauthorized' });
};
