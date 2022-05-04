import { AuthProvider } from '../stores/auth';

export function AuthProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
