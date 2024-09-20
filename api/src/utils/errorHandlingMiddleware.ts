import type { NextFunction, Response, Request } from 'express';
import { ZodError } from 'zod';
import { zodErrorToString } from './handleZodError';

interface HandleError {
  _error: unknown;
  uncaught?: boolean;
}

interface CreateErrorMessage {
  message: string;
  code?: number;
}

export function createError({ message, code = 500 }: CreateErrorMessage) {
  return { message, code };
}

export function handleError({ _error, uncaught }: HandleError): {
  message: string;
  code: number;
  uncaught?: string;
} {
  console.log(_error);

  //default error
  let error: { message: string; code: number; uncaught?: string } = {
    message: 'Unexpected error has occurred',
    code: 500,
  };

  if (typeof _error === 'string') {
    error = createError({ message: _error });
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

export function errorHandlingMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { message, code, ...rest } = handleError({ _error: error });
  res.status(code);
  res.json({ error: message, ...rest });
  next();
}
