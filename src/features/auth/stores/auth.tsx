import React, { useCallback } from 'react';
import { SignInProps, SignUpProps, User } from '../types';
import { axios } from '~/lib/axios';
import { Either } from '~/utils/Either';
import { storage } from '~/utils/storage';

export interface AuthState {
  user: User;
  authenticated: boolean;
  loading: boolean;
}

export interface AuthProviderValue extends AuthState {
  signIn: (props: SignInProps) => Promise<Either<Error, User>>;
  signUp: (props: SignUpProps) => Promise<Either<Error, undefined>>;
  signOut: () => void;
  me: () => Promise<Either<Error, User>>;
}

export const AuthContext = React.createContext<AuthProviderValue>({
  user: {
    uuid: '',
    email: '',
    username: '',
  },
  loading: true,
  authenticated: false,
  signIn: async () => {
    return Either.left(
      new Error('El nombre de usuario o la contraseña son incorrectos.')
    );
  },
  signUp: async () => {
    return Either.left(new Error('Ha ocurrido un error al registrarse.'));
  },
  signOut: () => {},
  me: async () => {
    return Either.left(new Error('No estás autenticado.'));
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>({
    uuid: '',
    email: '',
    username: '',
  });

  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const signOut = useCallback(() => {
    setUser({
      uuid: '',
      email: '',
      username: '',
    });

    storage.clearToken();

    setAuthenticated(false);
  }, []);

  const signIn = useCallback(
    async (props: SignInProps) => {
      try {
        const res = await axios.post<{
          token: string;
          user: User;
        }>('/auth/signin', props);

        const { token, user } = res.data;

        storage.setToken(token);

        setUser(user);
        setAuthenticated(true);

        return Either.right<Error, User>(user);
      } catch (e) {
        signOut();

        return Either.left<Error, User>(
          new Error('El nombre de usuario o la contraseña son incorrectos.')
        );
      }
    },
    [signOut]
  );

  const signUp = useCallback(async (props: SignUpProps) => {
    try {
      await axios.post<undefined>('/auth/signup', props);
      return Either.right<Error, undefined>(undefined);
    } catch (e) {
      return Either.left<Error, undefined>(
        new Error('Ha ocurrido un error al registrarse.')
      );
    }
  }, []);

  const me = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get<User>('/auth/me');

      const user = res.data;

      setUser(user);
      setAuthenticated(true);
      setLoading(false);

      return Either.right<Error, User>(user);
    } catch (e) {
      setLoading(false);
      signOut();

      return Either.left<Error, User>(e as Error);
    }
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        signIn,
        signOut,
        signUp,
        me,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
