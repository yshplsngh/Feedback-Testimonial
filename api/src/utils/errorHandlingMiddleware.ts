import type { NextFunction, Response, Request } from 'express';
import type { HandleError, CreateErrorMessage } from './utilsType';
import { ZodError } from 'zod';
import { zodErrorToString } from './handleZodError';

export function createError({ message, code = 500 }: CreateErrorMessage) {
  return { message, code };
}

export function handleError({ _error, uncaught }: HandleError) {
  const errorData =
    typeof _error === 'string' ? createError({ message: _error }) : _error;

  let error = errorData || new Error('Unexpected error has occurred');

  if (error instanceof ZodError) {
    error = { code: 400, message: zodErrorToString(error) };
  }

  if (error instanceof Error) {
    console.log(error);
    error = { code: 500, message: error.stack };
  }

  if (uncaught) {
    error.message = `uncaught exception or unhandled rejection, Node process finished !!\n ${error.message}`;
  }
  return error;
}

export function errorHandlingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { message, code, ...rest } = handleError({ _error: error });
  res.status(code);
  res.json({ error: message, ...rest });
  next();
}
