import type { NextFunction, Response, Request } from 'express';
import { ZodError } from 'zod';
import { zodErrorToString } from './handleZodError';

export class createError extends Error {
  code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.code = code;
  }
}

export function handleError({
  _error,
  uncaught,
}: {
  _error: unknown;
  uncaught?: boolean;
}): {
  message: string;
  code: number;
  uncaught?: string;
} {
  //default error
  let error: { message: string; code: number; uncaught?: string } = {
    message: 'Unexpected error has occurred',
    code: 500,
  };

  if (typeof _error === 'string') {
    error = new createError(_error);
  } else if (_error instanceof createError) {
    error = { code: _error.code, message: _error.message };
  } else if (_error instanceof ZodError) {
    error = { code: 400, message: zodErrorToString(_error) };
  } else if (_error instanceof Error) {
    error = { code: 500, message: _error.stack || 'Unknown error' };
  }

  if (uncaught) {
    error = {
      ...error,
      uncaught:
        'uncaught exception or unhandled rejection, Node process finished !!',
    };
    console.log(error);
  }
  return error;
}

export function errorHandling(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { message, code, ...rest } = handleError({ _error: error });
  res.status(code).json({ message: message, ...rest });
  next();
}
