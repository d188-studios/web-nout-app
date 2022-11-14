import { BaseErrorProps, ValidationErrorProps } from '~/utils/errors';
export interface User {
  uuid: string;
  email: string;
  username: string;
  authorized: boolean;
  baneado: boolean;
  survey: boolean;
}

export interface SignInProps {
  username: string;
  password: string;
}

export interface SignUpProps {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type SignUpResponseData =
  | undefined
  | {
      errors: ValidationErrorProps[];
    }
  | {
      error: BaseErrorProps;
    };
