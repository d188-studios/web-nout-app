export interface User {
  uuid: string;
  email: string;
  username: string;
}

export interface SignInProps {
  username: string;
  password: string;
}

export interface SignUpProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}