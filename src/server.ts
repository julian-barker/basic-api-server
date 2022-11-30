// 'use strict';

import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './middleware/logger';
import validator from './middleware/validator';
import notFound from './handlers/404';
import serverErr from './handlers/500';

dotenv.config();
export const app: Express = express()

const PORT = process.env.PORT || 3001;

app.use(cors()); // use cors as middleware

// home route
app.get('/', logger, (req: Request, res: Response) => {
  res.status(200).send('We\'re live!!!');
});

app.get('/person', logger, validator, (req: Request, res: Response) => {
  const { name } = req.query;
  res.status(200).send(`H3ll0, ${name}`);
})

// example bad route to force error
app.get('/bad', (req: Request, res: Response, next: NextFunction) => {
  next('Error...');
});

// 404 error for all other routes
app.use('*', notFound);

// error handler
app.use(serverErr);

export function start() {
  app.listen(PORT, () => console.log('listening on port: ', PORT));
}
