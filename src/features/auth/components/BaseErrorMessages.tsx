import { BaseError } from '~/utils/errors';

export interface BaseErrorMessagesProps {
  error: BaseError | null;
}

export function BaseErrorMessages({ error }: BaseErrorMessagesProps) {
  if (error === null) return null;

  return (
    <p className="text-center text-red-500 mb-0">
      {error.error ? error.error.message : error.message}
    </p>
  );
}
