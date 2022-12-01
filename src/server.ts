// 'use strict';

import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notFound from './handlers/404';
import serverErr from './handlers/500';
import { clothesRouter, foodRouter } from './routes'

dotenv.config();
export const app: Express = express()

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(clothesRouter);
app.use(foodRouter);

app.get('/', logger, (req: Request, res: Response) => {
  res.status(200).send('We\'re live!!!');
});

// app.get('/person', logger, validator, (req: Request, res: Response) => {
//   const { name } = req.query;
//   res.status(200).send(`H3ll0, ${name}`);
// })

app.use('*', notFound);
app.use(serverErr);

export function start() {
  app.listen(PORT, () => console.log('listening on port: ', PORT));
}
