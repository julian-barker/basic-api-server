'use strict';

import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.query.name === undefined) {
    throw 'No name supplied!';
  }
  next();
};