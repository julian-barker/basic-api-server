'use strict';

import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  req.timestamp = new Date();
  console.log('logged at', req.timestamp);
  next();
};