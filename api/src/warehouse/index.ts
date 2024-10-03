import { Express, Request, Response } from 'express';

export default function (app: Express) {
  app.get(
    '/api/warehouse/:spaceName/:username',
    (req: Request, res: Response) => {
      console.log(req.params);
      res.status(200).send('working');
    },
  );
}
