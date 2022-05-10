import { ValidationError } from '~/utils/errors';

export interface ErrorMessagesProps {
  error: ValidationError | null;
}

export function ValidationErrorMessages({ error }: ErrorMessagesProps) {
  if (error === null) return null;

  return (
    <>
      {error.errors.map((e, i) => {
        return (
          <p key={i} className="text-center text-red-500 mb-0">
            {e.msg}
          </p>
        );
      })}
    </>
  );
}
