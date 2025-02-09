import { ValidationError } from 'sequelize'
import type { Response, NextFunction, Request } from 'express';
import type { Boom } from '@hapi/boom';

type BoomError = Boom & {
  isBoom: boolean;
  output: {
    statusCode: number;
    payload: {
      statusCode: number;
      error: string;
      message: string
    }
  }
}

type OrmError = ValidationError & {
  name: string;
  errors: Array<{
    message: string;
    type: string;
    path: string;
    value: string;
  }>;
};


export const logErrors = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
  next(err);
};

export const errorHandlers = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  next(err)
};

export const errorHandler = (err: BoomError | OrmError, _req: Request, res: Response, next: NextFunction): void => {
  if ('isBoom' in err && err.isBoom) {
    const { statusCode, payload } = err.output;
    res.status(statusCode).json(payload);
  } else if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errrors: err.errors
    })
  } else {
    next(err);
  }
};



