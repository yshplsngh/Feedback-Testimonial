export interface CreateErrorMessage {
  message: string;
  code?: number;
}

export interface HandleError {
  _error: unknown;
  uncaught?: boolean;
}
