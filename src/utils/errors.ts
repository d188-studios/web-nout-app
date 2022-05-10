export interface BaseErrorProps {
  message: string;
  status?: number;
}

export interface BaseErrorOptions {
  error?: BaseErrorProps;
}

export class BaseError extends Error {
  error?: BaseErrorProps;

  constructor(message: string, options: BaseErrorOptions = {}) {
    super(message);
    this.name = 'BaseError';
    this.error = options.error;
  }
}

export interface ValidationErrorProps {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ValidationErrorOptions extends BaseErrorOptions {
  errors?: ValidationErrorProps[];
}

export class ValidationError extends BaseError {
  errors: ValidationErrorProps[];

  constructor(message: string, options: ValidationErrorOptions = {}) {
    super(message, options);
    this.name = 'ValidationError';
    this.errors = options.errors || [];
  }
}
