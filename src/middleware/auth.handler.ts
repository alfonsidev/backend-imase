import boom from '@hapi/boom';
import { Request, NextFunction } from 'express';
import config from '../config/config';

const checkAPIKey = (req: Request, next: NextFunction) => {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

export { checkAPIKey };
