import React from 'react';
import { Credentials, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface AuthState {
  user: User;
  authenticated: boolean;
}

export interface AuthProviderValue extends AuthState {
  signIn: (credentials: Credentials) => void;
  signOut: () => void;
}

export const AuthContext = React.createContext<AuthProviderValue>({
  user: {
    id: '',
    email: '',
    username: '',
  },
  authenticated: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>({
    id: '',
    email: '',
    username: '',
  });

  const [authenticated, setAuthenticated] = React.useState(false);

  const signIn = (credentials: Credentials) => {
    setUser({
      id: uuidv4(),
      email: credentials.email,
      username: 'johndoe',
    });

    setAuthenticated(true);
  };

  const signOut = () => {
    setUser({
      id: '',
      email: '',
      username: '',
    });

    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
