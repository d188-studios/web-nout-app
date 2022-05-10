import { BaseError, ValidationError } from '~/utils/errors';
import { BaseErrorMessages } from './BaseErrorMessages';
import { ValidationErrorMessages } from './ValidationErrorMessages';

export interface ErrorMessagesProps {
  error: Error | BaseError | ValidationError | null;
}

export function ErrorMessages({ error }: ErrorMessagesProps) {
  if (error === null) return null;

  if (error instanceof ValidationError)
    return <ValidationErrorMessages error={error} />;

  return <BaseErrorMessages error={error} />;
}
